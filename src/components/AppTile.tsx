import React from 'react';
import ServerlessApp from '../interfaces/Interfaces';
import {Link} from 'react-router-dom';
import { Card, CardHeader, CardFooter, CardBody, Label, Split, SplitItem } from '@patternfly/react-core';
import { noop } from '@babel/types';
import TextFit from 'react-textfit';


interface IProps {
    app: ServerlessApp
    tagHook?: any,
    className?: string
    maxFont?: number
}


function getTagStrings(tags : string[], tagHook?: any) {

    function handleClickFunctor(key : string){
      return ((e : any) => tagHook(e,key));
    }

    var i = 0;
    return (tags.map((tag : string)=> ( i++ <= 3 ? 
      <SplitItem isFilled={false}>
        <Label key={tag} className="ks-card__footer__tag" onClick={tagHook? handleClickFunctor(tag) : noop}>
          {tag}
        </Label>
      </SplitItem> : ''
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
     
        <Card className={"ks-card "+props.className}>
            <CardHeader className="ks-card__heading">
            <Link to={'/apps/' + app_id}>
                <div className="ks-card__heading__left">
                  <TextFit mode="multi" max={props.maxFont? props.maxFont : 18}className="ks-card__heading__left__title">{name}</TextFit>
                  <div className="ks-card__heading__left__provider">By {author.name}</div>
                </div>
                <img className="ks-card__heading__logo" alt={name} src={logo_url} />
                </Link>
            </CardHeader>
            <CardBody className="ks-card__body">
              <Link to={'/apps/' + app_id}>
                <TextFit mode="multi" max={props.maxFont ? props.maxFont : 18} className="ks-card__body__description">{tagline}</TextFit>
              </Link>
            </CardBody>
        <CardFooter className="ks-card__footer"><Split>{tagStrings}</Split></CardFooter>
      </Card>
    
      
    );
}