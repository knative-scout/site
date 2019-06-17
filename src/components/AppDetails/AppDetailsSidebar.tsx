import React from 'react';
import ServerlessApp from '../../interfaces/Interfaces';
import { Stack, StackItem } from '@patternfly/react-core';
import {Map2} from '../../utils/Utils';


/**
 * Sidebar for App Details page
 */
export function AppDetailsSidebar (props : { app : ServerlessApp }) {

    const {app_id, name, version, author, logo_url, tagline, description, tags, maintainer, categories, verification_status, github_url, screenshots_urls, deployment_file_urls} = props.app;
    
    const labels :string[] = [
        "Application","Version","Author","Maintainer","GitHub Repo"
    ];
    const content : string[] = [
        app_id,version,author,maintainer,github_url
    ];


    return(
        <Stack className="ks-appdetails__sidebar">
            { Map2(labels,content,SidebarStackItem) }
        </Stack>
    );

}

function SidebarStackItem(label : string, content : string){
    return(
    <StackItem isFilled className="ks-appdetails__sidebar__stackitem">
        <span className="ks-appdetails__sidebar__stackitem__label">{label}</span>
        <span className="ks-appdetails__sidebar__stackitem__content">{content}</span>
    </StackItem>)
}
