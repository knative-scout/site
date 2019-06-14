import React, { Component, FunctionComponent } from 'react';
import { Brand, Page, PageHeader, PageSection} from '@patternfly/react-core';
import Scout_Cloud2 from '../imgs/Scout_Cloud2.png';

interface KSPProps { components : any[], sidebar?: any};


export const KSPage : React.FunctionComponent<KSPProps> = (props: KSPProps) => {

    const logo = (
        <a href="/">
            <Brand src={Scout_Cloud2} alt="kscout.io"></Brand>
        </a>
    )

    const Header =  (
            <PageHeader className="ks-topbar" logo={logo}/>
    );

    const Footer = (
        <PageSection className="ks-footer" variant="dark">
            <div className="ks-footer-content">
                KScout.io is a smart hub for serverless applications, currently
                in development by a team of Red Hat interns.
                <a href="https://github.com/kscout">View our repositories and contribute serverless apps here.</a>
            </div> 
        </PageSection>
    )

    


    return (
        <Page header={Header}
            sidebar={props.sidebar}
        >
            {props.components.map(c => {
            return (
                <PageSection isFilled={c.isFilled} noPadding={c.noPadding} children={c.component}/>
            )})}

            {Footer}
            
    
        </Page>
    );
}


