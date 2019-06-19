import React, { useState } from 'react';
import { useAppList } from '../hooks/Hooks';
import { AppTile } from './AppTile';
import { EmptyState, Grid, GridItem, Gallery, GalleryItem } from '@patternfly/react-core';
import ServerlessApp from '../interfaces/Interfaces';

interface AGProps {
    appList : ServerlessApp[],
    tagHook?: any
}

/**
 * Grid for displaying cards representing Serverless Apps on /apps page
 */
export const AppGrid : React.FC<AGProps> = (props) => {

    return(
        <Grid sm={2} md={4} lg={6} gutter="md">
            {props.appList == null || props.appList.length == 0? empty :
                props.appList.map( app => {
                    return (
                        <GridItem>
                            <AppTile key={app.app_id} app={app} tagHook={props.tagHook}></AppTile>
                        </GridItem>
                    );
                })}
        </Grid>
    );
}

const empty = (
        <EmptyState>
            <p>No Apps Found</p>
        </EmptyState>
);