import React from 'react';
import {Title, PageSection, Nav, NavList, NavItem} from '@patternfly/react-core';
import {KSPage, wrapSection} from './KSPage';
import Markdown from 'react-markdown';

/**
 * Type for one section of a documentation page
 */
interface DocSection {
    title: string,
    text: string
}

interface DocProps {
    sections : DocSection[]
}

/**
 * Transforms section object to PageSection for KSPage
 * @param section section object to make into PageSection
 */
const toDocSection = (section : DocSection) => {
    return (
        <PageSection key={section.title} className="ks-docpage__section">
            <Title id={section.title} className="ks-docpage__section__title" size="2xl">{section.title}</Title>
            <Markdown className="ks-docpage__section__text">
                {section.text}
            </Markdown>
        </PageSection>);
}

/**
 * Documentation page 
 * @param props.sections sections of documentation page
 */
const Documentation : React.FC<DocProps> = (props : DocProps) => {

    const navBar = (
        <Nav className="ks-docpage__nav">
            <NavList className="ks-docpage__nav__list">{
                (props.sections.map(section => 
                    {return(
                        <NavItem className="ks-docpage__nav__item" to={'#' + section.title}>
                            {section.title}
                        </NavItem>);
                    }))}
            </NavList>
        </Nav>
    );

    const pageSections = 
        (props.sections.map(toDocSection)).map((section) => wrapSection(section, {isFilled: false, noPadding: false})).concat([{component: undefined, isFilled: true, noPadding: true}])

    return (
        <KSPage components={pageSections} sidebar={navBar}/>
    );
}

const LMSections = [
    {
        title: 'What is KScout.io?',
        text: 'KScout.io is a Smart Hub for Knative Serverless Apps. You can use this site to learn about serverless and knative architecture, explore example serverless apps developed by community contributors, and deploy them to your own clusters.'
    },
    {
        title: 'Why use the hub?',
        text: 'The hub of serverless apps provides a central resource for open source knative apps. Explore apps, deploy them to see what they do, then study their source code and documentation to see how they work. Reuse code for your own serverless projects, or simply use them as resources to figure out how to use particular apis or implement certain features. Use the hub to start working with Knative Serverless apps as quickly and easily as possible.'
    }, 
    {
        title: 'What is Serverless?',
        text: 'Serverless architectures are application designs that incorporate third-party service, known as Backend-as- a-service or include custom code run in managed, ephemeral containers, known as Function-as-a-service. Read more: https://martinfowler.com/articles/serverless.html'

    },
    {
        title: 'How do I Contribute?',
        text: 'You can contribute apps to the KScout hub by submitting a pull request to [our serverless app repository](https://github.com/kscout/serverless-apps)'
    }
]

export const LearnMore = (props : {}) => {
    return (<Documentation sections={LMSections}/>);
}