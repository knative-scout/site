import React, {useState, useEffect} from 'react';
import { PrintArray } from '../utils/Utils';
import { Router } from 'react-router';

const baseurl = "https://api.kscout.io"

/**
 * Hook used to fetch specific app from api
 * @param appID app to fetch
 */
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

/**
 * Hook used to fetch complete app list from api
 * @param query search string to match apps with
 * @param tags list of tags to filter apps with
 * @param categories list of categories to filter apps with
 */
export function useAppList(query:string, tags:string[], categories:string[]) {

    const[appList,setAppList] = useState([]);
    const [categoryList,setCategoryList] = useState([]);
    const [tagList,setTagList] = useState([]);

    useEffect(
        function handleAppListFetch(){
            const squery = '?query=' + query;
            const stags = tags != undefined ? "&tags=" + PrintArray(tags,',') : '';
            const scats = categories != undefined ? "&categories=" + PrintArray(categories,",") : '';
            var request = baseurl + '/apps' + squery + stags + scats;
            console.log(request);
            fetch(request)
                .then( response =>
                    response.json()
                        .then( data => {
                            setAppList(data.apps);
                            setCategoryList(data.categories);
                            setTagList(data.tags);
                        })
                )
    },[query,tags,categories]);
    
    return {
        apps: appList,
        categories: categoryList,
        tags: tagList
    };
}

export function useDeployInstructions(appID : string) {

    const [deployInstructions,setDeployInstructions] = useState('Loading...');

    useEffect(
        function handleAppFetch(){
            fetch(baseurl + '/apps/id/' + appID + '/deployment-instructions')
                .then( response =>
                    response.json()
                        .then( data =>
                            setDeployInstructions(data.instructions)
                        )
                )
    }, [appID]);

    return deployInstructions;
}

export function useSessionID(){

    const [sessionID,setSessionID] = useState('');

    useEffect(function handleSessionIDFetch(){
        const local = localStorage.getItem('sessionID');
        if(local){ 
            setSessionID(local);
        }
        else { //if no sessionid stored
            fetch("https://bot.kscout.io/session")
                .then( response =>
                    response.json()
                        .then( data => {
                            setSessionID(data.session_id);
                            localStorage.setItem('sessionID',data.session_id);
                        }
                        ))
        }
    });

    return sessionID;
}