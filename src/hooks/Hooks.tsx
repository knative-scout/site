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