import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import { ListChildComponentProps } from 'react-window';

export interface IProps extends ListChildComponentProps {
    id:string
}
const Row = (props: IProps)=> {
    const { id, style } = props;

    return (
        <ListItem button style={style} key={id}>
            <ListItemText primary={`Item ${id}`} />
        </ListItem>
    );
}

export default Row