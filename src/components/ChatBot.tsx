import React, {useState} from 'react';
import { useSessionID } from '../hooks/Hooks';
import { TextInput, InputGroup, Button, ButtonVariant, Form } from '@patternfly/react-core';
import {SearchIcon, PooStormIcon} from '@patternfly/react-icons';
import { truncateSync } from 'fs';

interface ChatMessage {
    isUser : boolean,
    text : string
}

interface ChatProps {
}

export const ChatBot = (props : ChatProps) => {

    const sessionID = useSessionID();

    const [steps,setSteps] = useState<ChatMessage[]>([]);

    const addStep = (text : string, isUser : boolean) =>{
        console.log('Got Here');

        const stps = steps.slice();
        stps.push({
            isUser: isUser,
            text: text
        });
        setSteps(stps);
    }

    const sendMessage = (text :string) => {

        addStep(text,true);        

        const body = {
            user : sessionID,
            text : [text]
        }

        fetch("https://bot.kscout.io/messages",{
            method: 'POST',
            body: JSON.stringify(body)
        }) .then( response => 
                response.json()
                .then( data => {
                    addStep(data.text,false);
                }));
    }

    const [message,setMessage] = useState('');

    const handleTextChange = (text : any) => {
        console.log(JSON.stringify(text));
        setMessage(text);
    }

    const handleSubmit = (event : any) => {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return (
        <div className="ks-chatbot">test 
            <div className="ks-chatbot__messages"> test
                {steps.map((message : ChatMessage) => {
                    console.log("for each here");
                    return (
                        <div className={"ks-chatbot__message " + 
                        message.isUser ? "ks-chatbot__message__user" : 
                        "ks-chatbot__message__bot"}>{message.text}</div>
                    );
                })}
            </div>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <TextInput value={message} onChange={handleTextChange} id="chatbot-input"/>
                    <Button type='submit' variant={ButtonVariant.tertiary}><SearchIcon /></Button>
                </InputGroup>
            </Form>

        </div>
    );
} 