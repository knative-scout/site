import React, {useState, useEffect} from 'react';
import { PrintArray } from '../utils/Utils';

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

    useEffect(
        function handleAppListFetch(){
            const squery = '?query=' + query;
            const stags = tags != undefined ? "&tags=" + PrintArray(tags,',') : '';
            const scats = categories != undefined ? "&categories=" + PrintArray(categories,",") : '';
            var request = baseurl + '/nsearch' + squery + stags + scats;

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

/**
 * Hook used to fetch complete category list from api
 * @param query search string to match apps with. Returns list of categories of apps matching search query.
 */
export function useCategoryList(query:string) {

    const[categoryList,setCategoryList] = useState([]);

    useEffect(
        function handleAppListFetch(){
            const squery = '?query=' + query;
            var request = baseurl + '/apps/categories' + squery;

            fetch(request)
                .then( response =>
                    response.json()
                        .then( data =>
                            setCategoryList(data.categories)
                        )
                )
    },[query]);
    
    return categoryList;
}

/**
 * Hook used to fetch complete tag list from api
 * @param query search string to match apps with. Returns list of tags of apps matching search query.
 */
export function useTagList(query:string) {

    const[tagList,setTagList] = useState([]);

    useEffect(
        function handleAppListFetch(){
            const squery = '?query=' + query;
            var request = baseurl + '/apps/tags' + squery;

            fetch(request)
                .then( response =>
                    response.json()
                        .then( data =>
                            setTagList(data.tags)
                        )
                )
    },[query]);
    
    return tagList;
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