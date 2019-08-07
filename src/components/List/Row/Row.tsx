import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { ListChildComponentProps } from 'react-window';
import { IDataSourceItem } from '../List';

export interface IProps extends ListChildComponentProps {
    loading?: boolean
    onClick?: () => {}
    contentRenderer?: (item:IDataSourceItem) => JSX.Element
}

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

const Row = (props: IProps) => {
    const { style, data, index } = props;
    const item = data[index] as IDataSourceItem;
    return (
        <ListItem ContainerProps={{ style }} ContainerComponent="div" key={item.id}>
            {props.loading ? (<Skeleton width={getRandomInt(20) * 10} />) : props.contentRenderer ? props.contentRenderer(item) : <ListItemText primary={item.id}/>}
        </ListItem>
    );
}

export default Row