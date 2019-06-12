import React from 'react';
import ServerlessApp from '../interfaces/Interfaces';
import { Card, CardHeader, CardFooter, CardBody, Label } from '@patternfly/react-core';

interface IProps {
    app: ServerlessApp
}


function getTagStrings(tags : string[]) {
    return (tags.map((tag : string)=> (
      <Label key={tag} className="ks-card__footer__tag">
        {tag}
      </Label>
    )))
  }

export const AppTile : React.FC<IProps> = (props : IProps) => {

    const {name, author, logo_url, tagline, tags} = props.app

    const tagStrings = tags ? getTagStrings(tags) : null;


    return (
        <Card className="ks-card">
        <CardHeader className="ks-card__heading">
          <div className="ks-card__heading__left">
            <span className="ks-card__heading__left__title">{name}</span>
            <span className="ks-card__heading__left__provider">{author}</span>
          </div>
          <img className="ks-card__heading__logo" alt={name} src={logo_url} />
        </CardHeader>
        <CardBody className="ks-card__body">
          <div className="ks-card__body__description">{tagline}</div>
        </CardBody>
        <CardFooter className="ks-card__footer">{tagStrings}</CardFooter>
      </Card>
    );
}