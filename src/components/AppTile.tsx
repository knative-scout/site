import React from 'react';
import ServerlessApp from '../interfaces/Interfaces';
import {Link} from 'react-router-dom';
import { Card, CardHeader, CardFooter, CardBody, Label } from '@patternfly/react-core';
import { noop } from '@babel/types';


interface IProps {
    app: ServerlessApp
    tagHook?: any,
    className?: string
}


function getTagStrings(tags : string[], tagHook?: any) {

    function handleClickFunctor(key : string){
      return ((e : any) => tagHook(e,key));
    }
    return (tags.map((tag : string)=> (
      <Label key={tag} className="ks-card__footer__tag" onClick={handleClickFunctor(tag)}>
        {tag}
      </Label>
    )))
  }

/**
 * Individual app card in app grid.
 * @param props.app App info to render in card
 * @param tagHook Functor to produce key tied functions to propgate tag selection events upwards
 */
export const AppTile : React.FC<IProps> = (props : IProps) => {

    const {app_id, name, author, logo_url, tagline, tags} = props.app

    const tagStrings = tags ? getTagStrings(tags,props.tagHook) : null;




    return (
      <Link to={'/apps/' + app_id}>
        <Card className={"ks-card "+props.className}>
            <CardHeader className="ks-card__heading">
                <div className="ks-card__heading__left">
                  <div className="ks-card__heading__left__title">{name}</div>
                  <div className="ks-card__heading__left__provider">By {author.name}</div>
                </div>
                <img className="ks-card__heading__logo" alt={name} src={logo_url} />
            </CardHeader>
          <CardBody className="ks-card__body">
              <div className="ks-card__body__description">{tagline}</div>
          </CardBody>
        
        <CardFooter className="ks-card__footer">{tagStrings}</CardFooter>
      </Card>
    </Link>
      
    );
}