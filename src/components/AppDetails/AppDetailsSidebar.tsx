import React, {useState} from 'react';
import ServerlessApp from '../../interfaces/Interfaces';
import { Stack, StackItem, Button, Modal, ClipboardCopy, ClipboardCopyVariant, Card, CardHeader, CardBody, Label } from '@patternfly/react-core';
import { FaLink } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {Map2} from '../../utils/Utils';
import { useDeployInstructions } from '../../hooks/Hooks';
import {Markdown} from '../Markdown';


interface DBProps {
    appID : string
}

function getLabels(items : string[]) {
    return (items.map((item: string) => (
	   <Label className="ks-appdetails__sidebar__label">
		  {item}
	   </Label>
    )))
}

/**
 * Sidebar for App Details page
 */
export function AppDetailsSidebar (props : { app : ServerlessApp }) {
    const app = props.app;

    return(<div>
	   <Card className="ks-appdetails__sidebar__card">
		  <CardHeader>
			 {app.name}
		  </CardHeader>

		  <CardBody className="ks-appdetails__sidebar__card__body">
			 <span>{app.tagline}</span>
		  </CardBody>
	   </Card>

	   <Card className="ks-appdetails__sidebar__card">
		  <CardBody className="ks-appdetails__sidebar__card__body">
			 <DeployButton appID={app.app_id} />
		  </CardBody>
	   </Card>
	   
	   <Card className="ks-appdetails__sidebar__card">

		  <CardBody className="ks-appdetails__sidebar__card__body">
			 <div id="ks-appdetails__sidebar__first_section"
				 className="ks-appdetails__sidebar__section">
				<div className="ks-appdetails__sidebar__section__title">
				    Author
				</div>

				<span>
				    {app.author.name}
				    &nbsp;
				    <a href={'mailto:' + app.author.email}>
					   <span>(<MdEmail />)</span>
				    </a>
				</span>
			 </div>
			 
			 <div className="ks-appdetails__sidebar__section">
				<div className="ks-appdetails__sidebar__section__title">
				    Links
				</div>

				<a href={app.homepage_url} target="_blank">
				    <FaLink /> <span>Homepage URL</span>
				</a>
				
				<br />
				
				<a href={app.github_url} target="_blank">
				    <FaLink /> <span>Deploy Source Code</span>
				</a>
			 </div>
			 <div className="ks-appdetails__sidebar__section">
				<div className="ks-appdetails__sidebar__section__title">
				    Categories
				</div>
				{getLabels(app.categories)}
			 </div>
			 
			 <div className="ks-appdetails__sidebar__section">
				<div className="ks-appdetails__sidebar__section__title">
				    Tags
				</div>
				{getLabels(app.tags)}
			 </div>
		  </CardBody>
	   </Card>
    </div>);
}

/**
 * Shows button which triggers modal with serverless app deployment instructions
 */
const DeployButton : React.FunctionComponent<DBProps> = (props : DBProps) => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const deployInstructions = useDeployInstructions(props.appID);

    const Code = ((props : any) => (
	<ClipboardCopy variant={ClipboardCopyVariant.expansion}
		       isReadOnly>
	    {props.value}
	</ClipboardCopy>
    ));
    
    return (
	<div>
         <Button className="ks-appdetails__deploy_button"
			  onClick={() => setIsModalOpen(true)}variant="primary">
		   Deploy App
         </Button>
	    
         <Modal isSmall
			 title="Deployment Instructions"
			 isOpen={isModalOpen}
			 onClose={() => { setIsModalOpen(false); }}>
		
		<Markdown className="ks-markdown"
			  source={deployInstructions}/>
            </Modal>
	</div>
    );
}
