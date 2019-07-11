import React, {useState} from 'react';
import { useSessionID } from '../hooks/Hooks';
import { TextInput, ClipboardCopy, ClipboardCopyVariant, InputGroup, Button, ButtonVariant, Form, Stack, StackItem } from '@patternfly/react-core';
import {SearchIcon, PooStormIcon} from '@patternfly/react-icons';
import { truncateSync } from 'fs';
import _ from 'lodash';
import ServerlessApp from '../interfaces/Interfaces';
import { AppTile } from './AppTile';


const ReactMarkdown = require('react-markdown/with-html');

interface option {
    label: string,
    callback: string
}

interface ChatMessage {
    isUser : boolean,
    text : string,
    options?: option[],
    apps?: ServerlessApp[]
}

interface ChatProps {
}

export const ChatBot = (props : ChatProps) => {

    const sessionID = useSessionID();

    const [steps,setSteps] = useState<ChatMessage[]>([]);

    const addStep = (text : string, isUser : boolean, options?: option[], apps?: ServerlessApp[]) =>{

        setSteps(steps => steps.concat( 
            options?
            {
                isUser: isUser,
                text: text,
                options: options
            } :
            apps? 
            {
                isUser: isUser,
                text: text,
                apps: apps
            } :
            {
                isUser: isUser,
                text: text
            } 
        ));

    }


    const optionMap = ((option : any) => {
        return ({
            label: option.label,
            callback: option.value.input.text
        })
    });

    const sendMessage = (text :string) => {
        console.log("msg text: " + text);

        addStep(text,true);        

        const body = {
            user : sessionID,
            text : text
        }

        fetch("https://bot.kscout.io/messages",{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
              }
        }) .then( response => 
                response.json()
                .then( data => {
                    console.log(data);
                    const d = JSON.parse(data);
                    d.options ? addStep(d.title,false,d.options.map(optionMap)) :
                    d.apps? addStep("Apps",false,undefined,d.apps) :
                    addStep(d.text,false);
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

    const Code = ((props : any) => <ClipboardCopy variant={ClipboardCopyVariant.expansion} isReadOnly>{props.value}</ClipboardCopy>);

    return (
        <div className="ks-chatbot">
            <div className="ks-chatbot__header">Scout Chat</div>
            <Stack className="ks-chatbot__messages">
                {steps.map((message : ChatMessage) => {
                    return (
                        <StackItem isFilled={false} className={
                        message.isUser ? "ks-chatbot__message ks-chatbot__message__user" : 
                        "ks-chatbot__message ks-chatbot__message__bot"}>
                            <ReactMarkdown className="ks-markdown" renderers={{code : Code}} escapeHtml={(message.isUser)} source={message.text}/>
                            {message.options ? (<div className="ks-chatbot__message__options"> {
                                message.options.map((option : option) => {
                                    return (
                                    <Button className="ks-chatbot__message__options__button" key={option.label} variant="tertiary" onClick={(e) => sendMessage(option.callback)}><div>{option.label}</div></Button>);
                                })} 
                            </div>) : (
                            message.apps ? message.apps.map((app : ServerlessApp) => {
                                console.log('HEREHEREHERE mapping apps');
                                return (
                                    <div>
                                        <AppTile app={app}/>
                                        <Button className="ks-chatbot__message__options__button" 
                                            variant="tertiary" 
                                            onClick={(e) => sendMessage(app.app_id)}><div>{"Deploy " + app.app_id}</div></Button>
                                    </div>);
                            }) : '')
                        }
                        </StackItem>
                    );
                })}
            </Stack>
            <Form className="ks-chatbot__input" onSubmit={handleSubmit}>
                <InputGroup>
                    <TextInput value={message} onChange={handleTextChange} id="chatbot-input"/>
                    <Button type='submit' variant={ButtonVariant.tertiary}><SearchIcon /></Button>
                </InputGroup>
            </Form>

        </div>
    );
} 