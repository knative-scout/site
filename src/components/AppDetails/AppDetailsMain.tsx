import React from 'react';
import ServerlessApp from '../../interfaces/Interfaces';
import { Gallery, GalleryItem, Title, Brand, Card, CardBody } from '@patternfly/react-core';
import Markdown from 'react-markdown';

/**
 * Display details about a serverless app.
 */
export function AppDetailsMain (props : { app : ServerlessApp }) {
    const app = props.app;

    return(
        <Card className="ks-appdetails__main">
		  <CardBody className="ks-appdetails__main__content">
			 <Markdown className="ks-appdetails__main__content__description ks-markdown" source={app.description}></Markdown>
		  </CardBody>
        </Card>
    );
}

export function AppDetailsHeader (props : { app : ServerlessApp }) {
    const app = props.app;
    
    return(
        <div className="ks-header">
            <div className="ks-appdetails__header">
                <div className="ks-appdetails__header__left">
                    <Title size="4xl" className="ks-appdetails__header__title">{app.name}</Title>
                    <span className="ks-appdetails__header__author">{ app.author? "By " + app.author.name : '' }</span>
                </div>
                <Brand className="ks-appdetails__header__logo" src={app.logo_url} alt={app.name}></Brand>
            </div>
        </div>
    );
}

function imageGalleryItems(screenshots_urls : string[], name : string){
    return screenshots_urls.map( url => {
        return(
        <GalleryItem key={url}>
            <img className="ks-appdetails__main__screenshot" alt={name} src={url}></img>
        </GalleryItem>
        )}
    );
}

/**
 * Gallery for app screenshots
 */
function imageGallery(screenshots_urls : string[] , name : string){
    return screenshots_urls ? 
        <Gallery gutter="md">
            {imageGalleryItems(screenshots_urls,name)}
        </Gallery> : '';

}
