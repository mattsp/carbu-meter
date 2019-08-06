import Fab from '@material-ui/core/Fab'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { Fragment, useEffect, useMemo } from 'react'
import { IModal } from '../../store/modal/types';
import { ITrip } from '../../store/trip/types'
import List from '../List/List'

interface IProps {
    trips: { [key: string]: ITrip }
    totalTrips: number
    fetchTrips: () => void
    addTrip: (trip: ITrip) => void
    openModal: (modal: IModal) => void
}

const useStyles = makeStyles<Theme>(theme => ({
    addButton: {
        bottom: theme.spacing(2),
        position: 'absolute',
        right: theme.spacing(2),
    },
}))

const Trips = ({ trips, totalTrips, fetchTrips, openModal }: IProps) => {
    useEffect(() => {
        fetchTrips()
    }, [fetchTrips])
    const classes = useStyles();
    
    const AddTripClickHandler = ()=>{
        openModal({id: 'TripAddModal'})
    }
    const data = useMemo(()=> Object.values(trips) as any as {[key: string]: ITrip}, [trips]) 
    return (
        <Fragment>
            <List dataSource={data} itemCount={totalTrips} itemSize={46} />
            <Fab color="primary" aria-label="add" className={classes.addButton} onClick={AddTripClickHandler}>
                <AddIcon />
            </Fab>
        </Fragment>
    )
}

export default Trips
