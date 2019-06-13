import React from 'react';
import ServerlessApp from '../../interfaces/Interfaces';
import { Gallery, GalleryItem } from '@patternfly/react-core';
import Markdown from 'react-markdown';

export function AppDetailsMain (props : { app : ServerlessApp }) {

    const {app_id, name, version, author, logo_url, tagline, description, tags, maintainer, categories, verification_status, github_url, screenshots_urls, deployment_file_urls} = props.app

    return(
        <div className="ks-appdetails__main">
            <h1 className="ks-appdetails__main__title">{name}</h1>
            <img className="ks-appdetails__main__logo" src={logo_url} alt={name}></img>
            {imageGallery(screenshots_urls,name)}
            <span className="ks-appdetails__main__author">{ author? "By " + author : '' }</span>
            <Markdown source={description}></Markdown>
        </div>
    );
}

function imageGalleryItems(screenshots_urls : string[], name : string){
    return screenshots_urls.map( url => {
        return(
        <GalleryItem>
            <img className="ks-appdetails__main__screenshot" alt={name} src={url}></img>
        </GalleryItem>
        )}
    );
}

function imageGallery(screenshots_urls : string[] , name : string){
    return screenshots_urls ? 
        <Gallery gutter="md">
            {imageGalleryItems(screenshots_urls,name)}
        </Gallery> : '';

}