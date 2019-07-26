import React, {useState} from 'react';
import ServerlessApp from '../../interfaces/Interfaces';
import { Stack, StackItem, Button, Modal, ClipboardCopy, ClipboardCopyVariant} from '@patternfly/react-core';
import {Map2} from '../../utils/Utils';
import { useDeployInstructions } from '../../hooks/Hooks';
import {Markdown} from '../Markdown';


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
            <Markdown className="ks-markdown" escapeHtml={true} source={deployInstructions}/>
         </Modal>
     </div>);
 }

/**
 * Sidebar for App Details page
 */
export function AppDetailsSidebar (props : { app : ServerlessApp }) {

    const {app_id, name, version, author, logo_url, tagline, description, tags, maintainer, categories, verification_status, github_url, screenshots_urls, deployment_file_urls} = props.app;
    
    const labels :string[] = [
        "Application","Version","Author","Email"
    ];
    const content : string[] = [
        app_id,version,author.name,author.email
    ];


    return(
        <Stack className="ks-appdetails__sidebar">
            <StackItem isFilled={false} className="ks-appdetails__sidebar__stackitem">
                <DeployButton appID={app_id}></DeployButton>
            </StackItem>
            { Map2(labels,content,SidebarStackItem) }

            <StackItem isFilled={false} className="ks-appdetails__sidebar__stackitem">
                <span className="ks-appdetails__sidebar__stackitem__label">GitHub Repo</span>
                <a href={github_url} className="ks-appdetails__sidebar__stackitem__content">Click Here</a>
            </StackItem>
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

