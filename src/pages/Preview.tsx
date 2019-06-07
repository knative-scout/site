import React, { useState, useEffect } from 'react'
import { useAppById } from '../hooks/Hooks';
import { AppTile } from '../components/AppTile';

export function Preview (props : {appid : string, match : any}) {
    const { appid }= props.appid ? props.appid : props.match.params
    const app =useAppById(appid);

    return(
        app == null ? empty(props.appid) : 
        <AppTile app={app}></AppTile>
    );
}

function empty(appid : string) {
    return(
        <p>Sorry, App {appid} not found.</p>
    )
}

