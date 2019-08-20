import React, {useState, useEffect, Component} from 'react';
import { useSessionID } from '../hooks/Hooks';
import { TextInput, ClipboardCopy, ClipboardCopyVariant, InputGroup, Button, ButtonVariant, Form, Stack, StackItem, Bullseye } from '@patternfly/react-core';
import {OutlinedPaperPlaneIcon, TimesIcon} from '@patternfly/react-icons';
import _ from 'lodash';
import ServerlessApp from '../interfaces/Interfaces';
import { AppTile } from './AppTile';
import { noop } from '@babel/types';
import {Markdown} from './Markdown';

const ReactMarkdown = require('react-markdown/with-html');

interface option {
    label: string,
    callback: string
}

/**
 * Interface describing a message in chat log
 * @param id id for message
 * @param isUser flag for if message is from user or bot
 * @param text text if message
 * @param options list of reply button options 
 * @param apps list of apps to display
 */
interface ChatMessage {
    id : number,
    isUser : boolean,
    text : string,
    options?: option[],
    apps?: ServerlessApp[]
}

/**
 * @param onCloseChat function to propogate closing window
 */
interface ChatProps {
    onCloseChat : ((e ?: any) => void)
}

export const ChatBot = (props : ChatProps) => {

    const sessionID = useSessionID(); //generate or fetch a session id for chatbot

    const storedSteps = sessionStorage.getItem('steps'); //fetch any stored chat messages
    const s = storedSteps ? JSON.parse(storedSteps) : [];

    const [steps,setSteps] = useState<ChatMessage[]>(s) //initialize messages state

    const scrollToBottom = () => { //function to scroll to bottom of current chat window
        let end = document.getElementById('messagesEnd');
        end? end.scrollIntoView() : noop();
    }
    scrollToBottom();

    //stores current message list in session
    const updateStorage = (newSteps : ChatMessage[]) => { 
        sessionStorage.setItem('steps',JSON.stringify(newSteps));
    }

    //adds message to list
    const addStep = (text : string, isUser : boolean, options?: option[], apps?: ServerlessApp[]) =>{

        // updates state
        setSteps(steps => {

            updateStorage(steps.concat( //updates session storage
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

    // prints list of options
    const optionMap = ((option : any) => {
        return ({
            label: option.label,
            callback: option.value.input.text
        })
    });

    //handles sending new user message
    const sendMessage = (text :string) => {

        if(text == ''){//if nothing sent, no change needed
            return;
        }

        addStep(text,true); //add user message to list       

        const body = {
            user : sessionID,
            text : text
        }

        //fetch response from chatbot
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
                    addStep(d.text,false); //add response to list
                }));
    }

    // initial message
    const m = storedSteps ? '' : 'Hi Scout!';
    const [message,setMessage] = useState(m);

    //handles chat message box
    const handleTextChange = (text : any) => {
        setMessage(text);
    }

    //handles chat message submit
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