import React, {useState, useEffect} from 'react';

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
    });

    return appById;
}

export function useAppList(query?: string) {

    const[appList,setAppList] = useState([]);

    const squery = query ? '?query=' + query : '';

    useEffect(
        function handleAppListFetch(){
            fetch(baseurl + '/apps' + squery)
                .then( response =>
                    response.json()
                        .then( data =>
                            setAppList(data.apps)
                        )
                )
    });
    
    return appList;
}