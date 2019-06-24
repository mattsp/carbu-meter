import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { ListChildComponentProps } from 'react-window';

export interface IProps extends ListChildComponentProps {
    loading?: boolean
}
const Row = (props: IProps) => {
    const { index, style } = props;
    return (
        <ListItem button style={style} key={index}>
            {props.loading ? (<Skeleton />) : (<ListItemText primary={`Item ${index + 1}`} />)}
        </ListItem>
    );
}

export default Row