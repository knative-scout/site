import React from 'react';
import ReactMarkdown from 'react-markdown';
import {ClipboardCopy, ClipboardCopyVariant} from '@patternfly/react-core';


interface MProps {
    source : string,
    escapeHtml ?: boolean,
    className ?: string
}

export const Markdown = (props : MProps) => {

    const Code = ((props : any) => <ClipboardCopy variant={ClipboardCopyVariant.expansion} isReadOnly>{props.value}</ClipboardCopy>);

    return (
        <ReactMarkdown className={"ks-markdown " + props.className} renderers={{code : Code}} escapeHtml={props.escapeHtml} linkTarget="_blank" source={props.source}/>
    );


}