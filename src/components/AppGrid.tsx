import React, { useState } from 'react';
import { useAppList } from '../hooks/Hooks';
import { AppTile } from './AppTile';
import { EmptyState,EmptyStateBody,Pagination} from '@patternfly/react-core';
import ServerlessApp from '../interfaces/Interfaces';

interface AGProps {
    appList : ServerlessApp[],
    tagHook?: any
}

/**
 * Grid for displaying cards representing Serverless Apps on /apps page
 */
export const AppGrid : React.FC<AGProps> = (props) => {

    const [perPage,setPerPage] = useState(20);
    const [page,setPage] = useState(1);

    const onSetPage = (_event : any, pageNumber : number) => {
        setPage(pageNumber);
    }

    const onPerPageSelect = (_event : any , newPerPage : number) => {
        setPerPage(newPerPage);
    }

    return(
        <div className="ks-appgrid">
            <div className="ks-appgrid__control">
                <Pagination
                    itemCount={props.appList.length}
                    perPage={perPage}
                    page = {page}
                    onSetPage={onSetPage}
                    onPerPageSelect={onPerPageSelect}
                />
            </div>
            <div className="ks-appgrid__grid">
                {props.appList == null || props.appList.length == 0? empty :
                    props.appList.map( app => {
                        return (
                                <AppTile key={app.app_id} app={app} tagHook={props.tagHook}></AppTile>
                        );
                    })}
            </div>
        </div>
    );
}

const empty = (
        <EmptyState>
            <EmptyStateBody>
                No Apps Found
            </EmptyStateBody>
        </EmptyState>
);