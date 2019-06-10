import React, { useState, useEffect } from 'react';
import { useAppList } from '../hooks/Hooks';
import {AppGrid} from '../components/AppGrid'

export function AppHub( props : {} ){

    const [searchQuery,setSearchQuery] = useState('');
    const [tags,setTags] = useState([]);
    const [categories,setCategories] = useState([]);

    const apps = useAppList(searchQuery,tags,categories);

    function handleSearchChange(e : any) {
        setSearchQuery(e.target.value);
    }

    return(
        <div className="ks-apphub">
            <input onChange={handleSearchChange}></input>
            <AppGrid appList={apps}></AppGrid>
        </div>
    );
} 