import React, {useState, useEffect, Component} from 'react';
import { useSessionID } from '../hooks/Hooks';
import { TextInput, ClipboardCopy, ClipboardCopyVariant, InputGroup, Button, ButtonVariant, Form, Stack, StackItem, Bullseye } from '@patternfly/react-core';
import { truncateSync } from 'fs';
import _ from 'lodash';
import ServerlessApp from '../interfaces/Interfaces';
import { AppTile } from './AppTile';
import { noop } from '@babel/types';
import {OutlinedPaperPlaneIcon, TimesIcon} from '@patternfly/react-icons';
import {Markdown} from './Markdown';

const ReactMarkdown = require('react-markdown/with-html');

interface option {
    label: string,
    callback: string
}

interface ChatMessage {
    id : number,
    isUser : boolean,
    text : string,
    options?: option[],
    apps?: ServerlessApp[]
}

interface ChatProps {
    onCloseChat : ((e ?: any) => void)
}

export const ChatBot = (props : ChatProps) => {

    const sessionID = useSessionID();

    const storedSteps = sessionStorage.getItem('steps');
    const s = storedSteps ? JSON.parse(storedSteps) : [];

    const [steps,setSteps] = useState<ChatMessage[]>(s) //useSteps();

    const scrollToBottom = () => {
        let end = document.getElementById('messagesEnd');
        end? end.scrollIntoView() : noop();
    }
    scrollToBottom();

    const updateStorage = (newSteps : ChatMessage[]) => {
        sessionStorage.setItem('steps',JSON.stringify(newSteps));
    }

   
    const addStep = (text : string, isUser : boolean, options?: option[], apps?: ServerlessApp[]) =>{

        setSteps(steps => {

            updateStorage(steps.concat( 
                options?
                {
                    id: steps.length,
                    isUser: isUser,
                    text: text,
                    options: options
                } :
                apps? 
                {
                    id: steps.length,
                    isUser: isUser,
                    text: text,
                    apps: apps
                } :
                {
                    id: steps.length,
                    isUser: isUser,
                    text: text
                } )); 
            
            return (steps.concat( 
            options?
            {
                id: steps.length,
                isUser: isUser,
                text: text,
                options: options
            } :
            apps? 
            {
                id: steps.length,
                isUser: isUser,
                text: text,
                apps: apps
            } :
            {
                id: steps.length,
                isUser: isUser,
                text: text
            } )) 
        }
        );
       
    

        scrollToBottom();
    }

    const optionMap = ((option : any) => {
        return ({
            label: option.label,
            callback: option.value.input.text
        })
    });

    const sendMessage = (text :string) => {

        if(text == ''){
            return;
        }

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

    const m = storedSteps ? '' : 'Hi Scout!';
    const [message,setMessage] = useState(m);

    const handleTextChange = (text : any) => {
        setMessage(text);
    }

    const handleSubmit = (event : any) => {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return (

        <div className="ks-chatbot">
            <div className="ks-chatbot__header" onDoubleClick={() => props.onCloseChat()}>
                <Bullseye>Scout Chat</Bullseye>
                <TimesIcon className="ks-chatbot__close" onClick={() => props.onCloseChat()}/>
            </div>
           
            <Stack className="ks-chatbot__messages">
                {steps.map((message : ChatMessage) => {
                    return (
                        <StackItem 
                            isFilled={false} 
                            key={message.id}
                            className={
                              (message.isUser ? "ks-chatbot__message ks-chatbot__message__user" : 
                              "ks-chatbot__message ks-chatbot__message__bot") + 
                              (message.apps? " ks-chatbot__message__apps" : "")}
                            id={message.id == steps.length-1 ? "messagesEnd" : ''}
                        >
                            <Markdown className="ks-markdown" escapeHtml={(message.isUser)} source={message.text}/>
                            {message.options ? (<div className="ks-chatbot__message__options"> {
                                message.options.map((option : option) => {
                                    return (
                                    <Button className="ks-chatbot__message__options__button" key={option.label} variant="tertiary" onClick={(e) => sendMessage(option.callback)}><div>{option.label}</div></Button>);
                                })} 
                            </div>) : (
                            message.apps ? message.apps.map((app : ServerlessApp) => {
                                return (
                                    <div>
                                        <AppTile maxFont={17} className="ks-chatbot__apptile" app={app}/>
                                        <Button className="ks-chatbot__message__options__button" 
                                            variant="tertiary" 
                                            onClick={(e) => sendMessage(app.app_id)}><div>{"Deploy " + app.app_id}</div></Button>
                                    </div>);
                            }) : '')
                        }
                        </StackItem>
                    );
                })}
                <StackItem isFilled={false} ></StackItem>
            </Stack>
            <Form className="ks-chatbot__input" onSubmit={handleSubmit}>
                <InputGroup>
                    <TextInput value={message} onChange={handleTextChange} placeholder="Type your message here..." id="chatbot-input"/>
                    <Button className="ks-chatbot__sendbutton" type='submit' variant={ButtonVariant.tertiary}><OutlinedPaperPlaneIcon className="ks-chatbot__sendicon" alt="send"/></Button>
                </InputGroup>
            </Form>

        </div>
    );
} 