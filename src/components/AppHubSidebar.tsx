import React, {useState} from 'react'
import { Stack, Select, StackItem, SelectVariant, SelectOption, PageSidebar, Checkbox } from '@patternfly/react-core';

export function AppHubSidebar(props: {categories: string[], selectedCategories : string[], tags: string[], selectedTags : string[], onTagSelect : any, onTagClear : any, onCategorySelect :(key : string)  => ((event : any) => any)}){
 /** Pull categories, tags, list as checkboxes, */
    return(
            <Stack className="ks-apphub-sidebar" >
                <StackItem isFilled={false}>
                    <span className="ks-apphub-sidebar__heading">Filters</span>
                </StackItem>
                <StackItem isFilled={false}>
                    <CategorySelect selected={props.selectedCategories} categories={props.categories} onChange={props.onCategorySelect}></CategorySelect>
                </StackItem>
                <StackItem isFilled={false}>
                    <label htmlFor="tagselect" className="ks-apphub-sidebar__label">Tags</label>
                    <TagSelect tags={props.tags} selected={props.selectedTags} onTagSelect={props.onTagSelect} onTagClear={props.onTagClear}></TagSelect>
                </StackItem>
                
           </Stack>
    );
    
}

function CategorySelect(props: {categories :string[], selected : string[], onChange : (key : string)  => ((event : any) => any) }){

    return (<div>
        {(props.categories.map( category => {
            return (
                <Checkbox
                    label={category}
                    onChange={props.onChange(category)}
                    id={category}
                    name={category}
                    aria-label={category}
                    isChecked={props.selected.includes(category)
                    }
                />
            );
        }))}
    </div>);
}

function TagSelect(props: {tags : string[], selected : string[], onTagSelect : any, onTagClear : any}) {

    const [isExpanded,setIsExpanded] = useState(false);

    function onToggle(){
        console.log(isExpanded);
        setIsExpanded(!isExpanded);
    }

    return(
        <Select
            id="tagselect"
            variant={SelectVariant.typeaheadMulti}
            aria-label="Select tags"
            onSelect={props.onTagSelect}
            onToggle={onToggle}
            onClear={props.onTagClear}
            isExpanded={isExpanded}
            selections={props.selected}
            className="ks-apphub-sidebar__tagselect"
            width="50%"
        >
            {props.tags.map((value) => 
                <SelectOption 
                    value={value}
                    key={value}
                    isDisabled={false}
                />)}
        </Select>
    );
}