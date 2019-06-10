import React, { useState } from 'react';
import { useAppList } from '../hooks/Hooks';
import { AppTile } from './AppTile';
import { EmptyState } from '@patternfly/react-core';
import ServerlessApp from '../interfaces/Interfaces';

export function AppGrid(props : { appList : ServerlessApp[]}) {

    return(
        <div>{
            props.appList == null || props.appList.length == 0? empty :
            props.appList.map( app => {
                return (<AppTile app={app}></AppTile>);
            })}
        </div>
    );
}

function empty() {
    return (
        <EmptyState>
            <p>No Apps Found</p>
        </EmptyState>
    )
}