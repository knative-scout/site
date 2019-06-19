import React, {useState} from 'react';
import ServerlessApp from '../../interfaces/Interfaces';
import { Stack, StackItem, Button, Modal} from '@patternfly/react-core';
import {Map2} from '../../utils/Utils';
import { useDeployInstructions } from '../../hooks/Hooks';
import Markdown from 'react-markdown';


interface DBProps {
    appID : string
}
const DeployButton : React.FunctionComponent<DBProps> = (props : DBProps) => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const deployInstructions = useDeployInstructions(props.appID);
    
    return (<div>
         <Button onClick={() => setIsModalOpen(true)}variant="primary">
             Deploy
         </Button>
         <Modal
             isSmall
             title="Deployment Instructions"
             isOpen={isModalOpen}
             onClose={() => {
                 setIsModalOpen(false);
             }}
         >
            <Markdown source={deployInstructions}/>
         </Modal>
     </div>);
 }

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
            <StackItem isFilled={false} className="ks-appdetails__sidebar__stackitem">
                <DeployButton appID={app_id}></DeployButton>
            </StackItem>
            { Map2(labels,content,SidebarStackItem) }
        </Stack>
    );

}

function SidebarStackItem(label : string, content : string){
    return(
    <StackItem key={label} isFilled={false} className="ks-appdetails__sidebar__stackitem">
        <span className="ks-appdetails__sidebar__stackitem__label">{label}</span>
        <span className="ks-appdetails__sidebar__stackitem__content">{content}</span>
    </StackItem>)
}

