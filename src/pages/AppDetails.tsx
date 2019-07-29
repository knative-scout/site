import React, { useState, useEffect } from 'react'
import { useAppById } from '../hooks/Hooks';
import { AppTile } from '../components/AppTile';
import { AppDetailsMain, AppDetailsHeader} from '../components/AppDetails/AppDetailsMain';
import { AppDetailsSidebar } from '../components/AppDetails/AppDetailsSidebar';
import { PageSection, Page, EmptyState, Grid, GridItem, Title, Brand, EmptyStateBody} from '@patternfly/react-core';
import { KSPage } from './KSPage';
import { tsPropertySignature } from '@babel/types';

interface ADProps {appid ?: string, match ?: any}

/**
 * App Details Page
 * @param props.appid app to pull from api and render info of
 * @param props.match provides access to url to pull appid if not provided in params
 */
export const AppDetails : React.FC<ADProps> =  (props : ADProps) => { 

    const { appid }= props.appid ? props.appid : props.match.params
    const info = useAppById(appid);
    const app = info.app;
    const loading = info.loading;

    const empty = (
        <EmptyState><EmptyStateBody>Sorry, App {appid} not found.</EmptyStateBody></EmptyState>
    );
    const loadingScreen = (
        <EmptyState><EmptyStateBody>Loading...</EmptyStateBody></EmptyState>
    );

    const AppDetailsSection  = (
        app ?
          (
            <Grid className="ks-appdetails__main" gutter="md">
                <GridItem span={8}>
                    <AppDetailsMain app={app}></AppDetailsMain>
                </GridItem>
			 
                <GridItem span={4}>
                    <AppDetailsSidebar app={app}></AppDetailsSidebar>
                </GridItem>
            </Grid>
            ) : (<div className="ks-appdetails__empty"> 
            {loading ? loadingScreen : empty}
        </div>)
    );
    
    const AppDetailsHead =  app == null ? null : 
            <AppDetailsHeader app={app}></AppDetailsHeader>



    const sections = [
        {component: AppDetailsHead, isFilled: false, noPadding: true},
        {component: AppDetailsSection, isFilled: true}
    ]

    return <KSPage components={sections}></KSPage> 
}
