import React, {useState, useEffect} from 'react';
import { PrintArray } from '../utils/Utils';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const baseurl = "https://api.kscout.io"

export function useAppById(appID : string) {

    const [appById,setAppById] = useState(null);

    useEffect(
        function handleAppFetch(){
            fetch(baseurl + '/apps/id/' + appID)
                .then( response =>
                    response.json()
                        .then( data =>
                            setAppById(data.app)
                        )
                )
    }, [appID]);

    return appById;
}


export function useAppList(query:string, tags:string[], categories:string[]) {

    const[appList,setAppList] = useState([]);




    useEffect(
        function handleAppListFetch(){
            const squery = '?query=' + query;
            const stags = tags != undefined ? "&tags=" + PrintArray(tags,',') : '';
            const scats = categories != undefined ? "&categories=" + PrintArray(categories,",") : '';
            var request = baseurl + '/apps' + squery + stags + scats;

            fetch(request)
                .then( response =>
                    response.json()
                        .then( data =>
                            setAppList(data.apps)
                        )
                )
    },[query,tags,categories]);
    
    return appList;
}