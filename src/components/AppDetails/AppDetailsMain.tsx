import React from 'react';
import ServerlessApp from '../../interfaces/Interfaces';
import { Gallery, GalleryItem, Title, Brand } from '@patternfly/react-core';
import Markdown from 'react-markdown';


/**
 * Main 
 * @param props.app ServerlessApp object  of app details to render
 */
export function AppDetailsMain (props : { app : ServerlessApp }) {

    const {app_id, name, version, author, logo_url, tagline, description, tags, maintainer, categories, verification_status, github_url, screenshots_urls, deployment_file_urls} = props.app

    return(
        <div className="ks-appdetails__main__content">
            {imageGallery(screenshots_urls,name)}
            <Markdown className="ks-appdetails__main__content__description ks-markdown" source={description}></Markdown>
        </div>
    );
}

export function AppDetailsHeader (props : { app : ServerlessApp }) {

    const {app_id, name, version, author, logo_url, tagline, description, tags, maintainer, categories, verification_status, github_url, screenshots_urls, deployment_file_urls} = props.app

    return(
        <div className="ks-header">
            <div className="ks-appdetails__header">
                <div className="ks-appdetails__header__left">
                    <Title size="4xl" className="ks-appdetails__header__title">{name}</Title>
                    <span className="ks-appdetails__header__author">{ author? "By " + author : '' }</span>
                </div>
                <Brand className="ks-appdetails__header__logo" src={logo_url} alt={name}></Brand>
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