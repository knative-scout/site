import React, { useState } from 'react';
import { useAppList } from '../hooks/Hooks';
import { AppTile } from './AppTile';
import { EmptyState } from '@patternfly/react-core';

export function AppGrid(props : {}) {

    const appList = useAppList();

    return(
        <div>{
            appList == null ? empty :
            appList.map( app => {
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