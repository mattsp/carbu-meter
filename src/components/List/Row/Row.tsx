import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { ListChildComponentProps } from 'react-window';

export interface IProps extends ListChildComponentProps {
    loading?: boolean
    onClick?: () => {}
}

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))
const Row = (props: IProps) => {
    const { index, style } = props;
    return (
        <ListItem button style={style} key={key}>
            {props.loading ? (<Skeleton width={getRandomInt(20) *10 } />) : (<ListItemText primary={`Item ${index + 1}`} />)}
        </ListItem>
    );
}

export default Row