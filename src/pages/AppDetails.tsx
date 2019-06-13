import React, { useState, useEffect } from 'react'
import { useAppById } from '../hooks/Hooks';
import { AppTile } from '../components/AppTile';
import { AppDetailsMain } from '../components/AppDetails/AppDetailsMain';
import { AppDetailsSidebar } from '../components/AppDetails/AppDetailsSidebar';
import { PageSection, Page, EmptyState } from '@patternfly/react-core';
import { KSPage } from './KSPage';
import { tsPropertySignature } from '@babel/types';

interface ADProps {appid ?: string, match ?: any}

export const AppDetails : React.FC<ADProps> =  (props : ADProps) => { 

        const { appid }= props.appid ? props.appid : props.match.params
        const app = useAppById(appid);

    const AppDetailsSection  = (

        app == null ? <div className="ks-appdetails__empty"> {empty(props.appid)}</div> : (
            <div className="ks-appdetails">
                <AppDetailsSidebar app={app}></AppDetailsSidebar>
                <AppDetailsMain app={app}></AppDetailsMain>
            </div>
            )
    );

    function empty(appid ?: string) {
        return(
            <EmptyState>Sorry, App {appid} not found.</EmptyState>
        )
    }


    const sections = [
        {component: AppDetailsSection, isFilled: false}
    ]

    return <KSPage components={sections}></KSPage> 
}