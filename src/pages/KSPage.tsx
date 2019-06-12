import React, { Component, FunctionComponent } from 'react';
import { Brand, Page, PageHeader, PageSection } from '@patternfly/react-core';
import Scout_Cloud2 from '../imgs/Scout_Cloud2.png';

interface KSPProps { components : any[], sidebar?: any};


export const KSPage : React.FunctionComponent<KSPProps> = (props: KSPProps) => {

    const logo = (
        <Brand src={Scout_Cloud2} alt="kscout.io"></Brand>
    )

    const Header =  (
            <PageHeader className="ks-topbar" logo={logo}/>
    );



    return (
        <Page header={Header}
            sidebar={props.sidebar}
        >
            {props.components.map(c => {
            return (
                <PageSection isFilled={c.isFilled} noPadding={c.noPadding} children={c.component}/>
            )})}
            
    
        </Page>
    );
}


