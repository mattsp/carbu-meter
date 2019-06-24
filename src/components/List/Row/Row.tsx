import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import { ListChildComponentProps } from 'react-window';

const Row = (props: ListChildComponentProps)=> {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

export default Row