import React, { useState, useEffect } from 'react'
import { useAppById } from '../hooks/Hooks';
import {EmptyState, EmptyStateBody} from '@patternfly/react-core';
import { AppTile } from '../components/AppTile';

export function Preview (props : {appid : string, match : any}) {
    const { appid }= props.appid ? props.appid : props.match.params
    const info = useAppById(appid);
    const app = info.app;

    const empty = (
        <EmptyState><EmptyStateBody>Sorry, App {appid} not found.</EmptyStateBody></EmptyState>
    );
    const loadingScreen = (
        <EmptyState><EmptyStateBody>Loading...</EmptyStateBody></EmptyState>
    );

    return(
        app  ? 
        <AppTile app={app}></AppTile> 
        : ( info.loading ? loadingScreen : empty)
    );
}



