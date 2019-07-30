import React, {useState} from 'react'
import { Card, CardHeader, CardBody, Stack, Select, StackItem, SelectVariant, SelectOption, PageSidebar, Checkbox } from '@patternfly/react-core';
import searchicon from '../imgs/Interface_icon_search_magnifying_glass_white.png';
import { getEnabledCategories } from 'trace_events';


/**
 * Sidebar for apphub page
 * @param props.categories full list of selectable categories
 * @param props.selectedCategories list of currently selected categories. Passed custom hook in AppHub page to keep state/update filters.
 * @param props.tags full list of selectable tags
 * @param props.selectedTags list of currently selected tags. Passed custom hook in AppHub page to keep state/update filters.
 * @param props.onTagSelect function to propogate tag selection event upwards and update filters.
 * @param props.onTagClear function to propogate tag clear event upwards and update filters.
 * @param props.onCategorySelect functor to provide key-tied functions to propogate category selection events upwards.
 */
export function AppHubSidebar(props: {
    allCategories: Category[],
    currentCategories: string[],
    selectedCategories: string[],
    tags: string[],
    selectedTags: string[],
    onTagSelect: any,
    onTagClear: any,
    onCategorySelect:(key: string)  => ((event: any) => any)
}) {
    return(
	   <div>
		  <Card>
			 <CardHeader>Categories</CardHeader>
			 <CardBody>
				<CategorySelect selected={props.selectedCategories}
							 allCategories={props.allCategories}
							 currentCategories={props.currentCategories}
							 onChange={props.onCategorySelect}>
				</CategorySelect>
			 </CardBody>
		  </Card>

		  <Card>
			 <CardHeader>Tags</CardHeader>
			 <CardBody>
				<TagSelect tags={props.tags}
						 selected={props.selectedTags}
						 onTagSelect={props.onTagSelect}
						 onTagClear={props.onTagClear}>
				</TagSelect>
			 </CardBody>
		  </Card>
	   </div>
    );
    
}

interface Category {
    label: string,
    value: string
}

function CategorySelect(props: {
    allCategories: Category[],
    currentCategories: string[],
    selected: string[],
    onChange: (key : string) => ((event : any) => any)
}){

    return (<div className="ks-apphub-sidebar__catselect">
        {props.allCategories.length == 0? (<em>No categories found</em>) : (props.allCategories.map( category => {
            return (
                <Checkbox key={category.value}
                    label={category.label}
                    onChange={props.onChange(category.value)}
                    id={category.value}
                    name={category.value}
                    aria-label={category.label}
                    isChecked={props.selected.includes(category.value)}
                    isDisabled={!props.currentCategories.includes(category.value)}
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
