import React, { useState, useEffect } from 'react';
import { useAppList, useCategoryList, useTagList } from '../hooks/Hooks';
import {AppGrid} from '../components/AppGrid'
import {AppHubSidebar} from '../components/AppHubSidebar'

export function AppHub( props : {} ){

    const [searchQuery,setSearchQuery] = useState('');
    const [tags,setTags] = useState([]);
    const [categories,setCategories] = useState([]);

    const apps = useAppList(searchQuery,tags,categories);
    const categoryList = useCategoryList(searchQuery);
    const tagList = useTagList(searchQuery);

    function handleSearchChange(e : any) {
        setSearchQuery(e.target.value);
    }
    //fix falses in apphubsidebar
    return(
        <div className="ks-apphub">
            <input onChange={handleSearchChange}></input> 
            <AppHubSidebar categories={categoryList} tags={tagList} onCategorySelect={false} onTagSelect={false}></AppHubSidebar>
            <AppGrid appList={apps}></AppGrid>
        </div>
    );
} 