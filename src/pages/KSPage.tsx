import React, { Component, FunctionComponent } from 'react';
import { Brand, Page, PageHeader, PageSection, Nav, NavVariants, NavList, NavItem} from '@patternfly/react-core';
import Scout_Cloud2 from '../imgs/Scout_Cloud2.png';
import {Link} from 'react-router-dom';


interface KSPProps { components : KSPSection[], sidebar?: any};


interface KSPSection {
    component : any,
    isFilled ?: boolean,
    noPadding ?: boolean
}

/**
 * Util function to transform <PageSection> object to correctly formatted KSPSection objects
 * @param section 
 * @param props 
 */
export const wrapSection  = (section : any, props?: {isFilled ?: boolean, noPadding ?: boolean}) => {
    return {
        component: section,
        isFilled: props ? props.isFilled : false,
        noPadding : props? props.noPadding : false
    }
}

/**
 * Wrapper for single page of KScout.io
 * @param props.components array of KSPSection objects to render within main section of page
 * @param props.sidebar content to render within page sidebar
 */
export const KSPage : React.FunctionComponent<KSPProps> = (props: KSPProps) => {

    const brand = <Brand src={Scout_Cloud2} alt="KScout.io"></Brand>

    const logoProps = {
        src: Scout_Cloud2, 
        href: "/"
    }

    const NavBar = ( <Nav className="ks-topbar__nav">
        <NavList variant={NavVariants.horizontal}>
            <NavItem className="ks-topbar__nav__item ks-topbar__nav__title">
                <Link to="/">KScout.io</Link>
            </NavItem>
            <NavItem className="ks-topbar__nav__item">
                <Link to="/apps">Apps</Link>
            </NavItem>
            <NavItem className="ks-topbar__nav__item">
                <Link to="/learn">Learn More</Link>
            </NavItem>
        </NavList>
    </Nav>);

    const Header =  (
        <PageHeader topNav={NavBar} className="ks-topbar" logo={brand} logoProps={logoProps}>
           
        </PageHeader>
    );

    const Footer = (
        <PageSection isFilled={false} className="ks-footer" variant="dark">
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
            {props.components.map((c,index) => {
            return (
                <PageSection key={index} isFilled={c.isFilled} noPadding={c.noPadding} children={c.component}/>
            )})}

            {Footer}
            
    
        </Page>
    );
}


