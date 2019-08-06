import { ListItemText } from '@material-ui/core';
import React from 'react'
import { ITrip } from '../../../store/trip/types';
import { IDataSourceItem } from '../../List/List';
import Row, {IProps as IRowProps} from '../../List/Row/Row';

const TripRow = (props: IRowProps) => {
    const creationDate = (item: ITrip) => new Date(item.creationDate - new Date(item.creationDate).getTimezoneOffset() * 60000).toDateString();
    const tripContentRenderer = (item: IDataSourceItem)=> <ListItemText primary={creationDate(item as ITrip)} secondary={`${(item as ITrip).distance} Km`}/> 
    return (
        <Row {...props} contentRenderer={tripContentRenderer}/>
    );
}

export default TripRow