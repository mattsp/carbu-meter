import { ListItemText } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { Fragment } from 'react'
import { utcToLocale } from '../../../helper/date-helper';
import { ITrip } from '../../../store/trip/types';
import { IDataSourceItem } from '../../List/List';
import Row, { IProps as IRowProps } from '../../List/Row/Row';

interface IProps extends IRowProps {
    deleteItem: (id: string) => void
    editItem: (id: string) => void
}
const TripRow = (props: IProps) => {
    const creationDate = (item: ITrip) => utcToLocale(item.creationDate).toDateString();
    const deleteClickHandler = (id: string) => {
        props.deleteItem(id);
    }
    const editClickHandler = (id: string) => {
        props.editItem(id);
    }
    const tripContentRenderer = (item: IDataSourceItem) =>
        <Fragment>
            <ListItemText primary={creationDate(item as ITrip)} secondary={`${(item as ITrip).distance} Km`} />
            <ListItemSecondaryAction>
                <IconButton onClick={() => editClickHandler(item.id)} edge="end" aria-label="delete">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteClickHandler(item.id)} edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </Fragment>

    return (
        <Row {...props} contentRenderer={tripContentRenderer} />
    );
}

export default TripRow