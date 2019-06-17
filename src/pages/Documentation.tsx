import React from 'react';
import {Title, PageSection} from '@patternfly/react-core';
import {KSPage, wrapSection} from './KSPage';

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
            <Title className="ks-docpage__section__title" size="2xl">{section.title}</Title>
            <div className="ks-docpage__section__text">
                {section.text}
            </div>
        </PageSection>);
}

/**
 * Documentation page 
 * @param props.sections sections of documentation page
 */
const Documentation : React.FC<DocProps> = (props : DocProps) => {

    const pageSections = 
        (props.sections.map(toDocSection)).map((section) => wrapSection(section, {isFilled: true, noPadding: false}));

    return (
        <KSPage components={pageSections}/>
    );
}

const LMSections = [
    {
        title: "Lorem Ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper lobortis mi at commodo. Nulla pulvinar aliquam augue, quis congue mi euismod porta. Donec lobortis orci est, ac malesuada lacus molestie a. Aliquam erat volutpat. Suspendisse varius purus quam, in efficitur elit gravida at. Vivamus vel nibh sed neque viverra faucibus. Fusce congue nisi at felis interdum, a feugiat magna vehicula. Fusce auctor pretium odio. Maecenas maximus eros mauris, ut luctus tellus porta posuere. Nam mi tellus, laoreet in malesuada ut, suscipit tempor arcu. Nunc vehicula felis nec risus consectetur vulputate. Donec ante nulla, rhoncus pellentesque ligula sit amet, pretium rutrum leo."
    },
    {
        title: "Lorem Ipsum 2",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper lobortis mi at commodo. Nulla pulvinar aliquam augue, quis congue mi euismod porta. Donec lobortis orci est, ac malesuada lacus molestie a. Aliquam erat volutpat. Suspendisse varius purus quam, in efficitur elit gravida at. Vivamus vel nibh sed neque viverra faucibus. Fusce congue nisi at felis interdum, a feugiat magna vehicula. Fusce auctor pretium odio. Maecenas maximus eros mauris, ut luctus tellus porta posuere. Nam mi tellus, laoreet in malesuada ut, suscipit tempor arcu. Nunc vehicula felis nec risus consectetur vulputate. Donec ante nulla, rhoncus pellentesque ligula sit amet, pretium rutrum leo."
    },
    {
        title: "Lorem Ipsum 3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper lobortis mi at commodo. Nulla pulvinar aliquam augue, quis congue mi euismod porta. Donec lobortis orci est, ac malesuada lacus molestie a. Aliquam erat volutpat. Suspendisse varius purus quam, in efficitur elit gravida at. Vivamus vel nibh sed neque viverra faucibus. Fusce congue nisi at felis interdum, a feugiat magna vehicula. Fusce auctor pretium odio. Maecenas maximus eros mauris, ut luctus tellus porta posuere. Nam mi tellus, laoreet in malesuada ut, suscipit tempor arcu. Nunc vehicula felis nec risus consectetur vulputate. Donec ante nulla, rhoncus pellentesque ligula sit amet, pretium rutrum leo."
    },
]

export const LearnMore = (props : {}) => {
    return (<Documentation sections={LMSections}/>);
}