import React, { useState, useEffect } from 'react';
import { useAppList } from '../hooks/Hooks';
import {AppGrid} from '../components/AppGrid'
import {AppHubSidebar} from '../components/AppHubSidebar'
import { Grid, GridItem } from '@patternfly/react-core';
import { KSPage } from './KSPage';
import searchicon from '../imgs/Interface_icon_search_magnifying_glass_white.png';

/**
 * App Hub page
 */
export function AppHub(props : {}) {

    //initialize hooks for current search query, selected tags, and selected categories
    const [searchQuery,setSearchQuery] = useState('');
    const [tags,setTags] = useState<string[]>([]);
    const [categories,setCategories] = useState<string[]>([]);

    //Pulls list of apps, categories, and tags from server, according to current search query
    const info = useAppList(searchQuery,tags,categories);
    const loading = info.loading ? info.loading : false;
    const apps = info.apps;
    const currentCategoryList = info.categories;
    const tagList = info.tags;

    const allCategoryList = [
        {
            label: "Analytics",
            value: "analytics"
        },
        {
            label: "Automation",
            value: "automation"
        },
        {
            label: "Entertainment",
            value: "entertainment"
        },
        {
            label: "Hello World",
            value: "hello world"
        },
        {
            label: "Internet of Things",
            value: "internet of things"
        },
        {
            label: "Utilities",
            value: "utilities"
        },
        {
            label: "Virtual Assistant",
            value: "virtual assistant"
        },
        {
            label: "Other",
            value: "other"
        }]

    function handleSearchChange(e : any) {
        setSearchQuery(e.target.value);
    }

    function handleTagSelect(e : any, selection : string){
        if(tags.includes(selection)){
            setTags(tags.filter(item => item != selection));
        }
        else {
            setTags(tags.concat([selection]));
        }
    }

    function handleTagClear(e : any){
        setTags([]);
    }

    /**
     * Header of page
     */
    const AppHubHeader = (
        <div className="ks-apphub-header ks-header">
            <div className="ks-apphub-header__search">
                <label htmlFor="apphub-search">Discover and Share Serverless Apps</label>
                <span className='ks-apphub-header__search__input'>
                    <img src={searchicon} alt=""></img>
                    <input className="" id="apphub-search" 
                    placeholder="Search KScout..." 
                    onChange={handleSearchChange}></input>
                </span>
            </div>
        </div>
    );

    /**
     * Functor to provide event handler functions tied to category names for handling category selection.
     * @param key name of category to generate handler for
     */
    const categoryHandlerFunctor :  (key : string)  => ((event : any) => any) = (key : string) => {
        const categoryHandler : ((event : any) => any) = (event : any) => {
            if(categories.includes(key)){
                setCategories(categories.filter(item => item != key));
            }
            else {
                setCategories(categories.concat([key]));
            }
        }

        return categoryHandler;
    }


    /**
     * Main page section
     */
    const AppHubMain : React.FC<{}> = ( props : {} ) => {
        return(
                <div className="ks-apphub">
                    <AppHubSidebar tags={tagList} selectedTags={tags} allCategories={allCategoryList} currentCategories={currentCategoryList} selectedCategories={categories}
                    onCategorySelect={categoryHandlerFunctor} onTagClear={handleTagClear} onTagSelect={handleTagSelect}/>
                    <AppGrid loading={loading} appList={apps} tagHook={handleTagSelect}/>
                </div>
        );
    } 

    const sections = [
        {component: AppHubHeader, isFilled: false, noPadding: true},
        {component: <AppHubMain/>, isFilled: true}
    ]

  

    return <KSPage components={sections}/>
}