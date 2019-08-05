import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { useEffect } from 'react'
import { ITrip } from '../../store/trip/types'
import List from '../List/List'

interface IProps {
  trips: { [key: string]: ITrip }
  totalTrips: number
  fetchTrips: () => void
}

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const Trips = ({ trips, totalTrips, fetchTrips }: IProps) => {
  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])
  const classes = useStyles();
  return (
    <div>
      <List dataSource={trips} itemCount={totalTrips} itemSize={46} />
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Trips
