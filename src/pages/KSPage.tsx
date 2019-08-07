import React, { useState, Component, FunctionComponent } from 'react';
import { Brand, Modal, Card, Page, PageHeader, PageSection, Nav, NavVariants, NavList, NavItem, Popover, Button} from '@patternfly/react-core';
import Scout_Cloud2 from '../imgs/Scout_Cloud2.png';
import {Link} from 'react-router-dom';
import { ChatBot } from '../components/ChatBot';


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
    const brand = <Brand className="ks-topbar__brand" src={Scout_Cloud2} alt="KScout.io" />;

    const logoProps = {
        src: Scout_Cloud2,
	href: "/",
    }

    const NavBar = ( <Nav className="ks-topbar__nav">
        <NavList variant={NavVariants.horizontal}>
	    <NavItem className="ks-topbar__nav__item">
                <Link to="/">Home</Link>
            </NavItem>
            <NavItem className="ks-topbar__nav__item">
                <Link to="/apps">Apps</Link>
            </NavItem>
            <NavItem className="ks-topbar__nav__item">
                <Link to="/learn">Learn More</Link>
            </NavItem>
        </NavList>
    </Nav>);

    const [isChatOpen,setIsChatOpen] = useState(false);
    const ChatPop = (
        <div className="ks-topbar__chat">
            <Button onClick={() => setIsChatOpen(!isChatOpen)} variant="secondary">
                Scout Chat
            </Button>
            {isChatOpen? 
             <div className="ks-topbar__chat__window">
                 <ChatBot/>
             </div> : ''
            }
        </div>
    );

    const Header =  (
        <PageHeader 
            topNav={NavBar} 
            className="ks-topbar" 
            logo={brand} logoProps={logoProps}
            toolbar={ChatPop}
        />
    );

    const Footer = (
        <PageSection isFilled={false} className="ks-footer" variant="dark">
            <div className="ks-footer-content">
                KScout.io is a smart hub for serverless applications, currently
                in development by a team at Red Hat. <br/>
                <a href="https://github.com/kscout">View our repositories and contribute serverless apps here.</a> <br/>
                <a href="http://bit.ly/kscouthack">
                    Sign up for our Knative Hackathon Here!
                </a>
            </div> 
        </PageSection>
    )

    return (
        <Page header={Header}
              sidebar={props.sidebar}
        >

            <PageSection isFilled={false} variant='dark'>
                <a href="http://bit.ly/kscouthack">
                <strong>
                    Sign up for our Knative Hackathon Here! ->
                </strong>
                </a>
            </PageSection>
            
            {props.components.map((c,index) => {
		return (
                    <PageSection key={index} isFilled={c.isFilled} noPadding={c.noPadding} children={c.component}/>
		)})}

            {Footer}
            
	    
        </Page>
    );
}


