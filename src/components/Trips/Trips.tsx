import Fab from '@material-ui/core/Fab'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { Fragment, useEffect, useMemo } from 'react'
import { IModal } from '../../store/modal/types'
import { ITrip } from '../../store/trip/types'
import List from '../List/List'
import { IProps as IPropsRow } from '../List/Row/Row'
import TripRow from './TripRow/TripRow'
import Loader from '../Loader/Loader'

interface IProps {
  loading: boolean
  currentLanguage: string
  dateFnsLanguages: { [key: string]: any }
  trips: { [key: string]: ITrip }
  totalTrips: number
  fetchTrips: () => void
  deleteTrip: (id: string) => void
  addTrip: (trip: ITrip) => void
  editTrip: (trip: ITrip) => void
  openModal: (modal: IModal) => void
  fetchFnsLanguages: (language: string) => void
}

const useStyles = makeStyles<Theme>(theme => ({
  addButton: {
    bottom: theme.spacing(2),
    position: 'absolute',
    right: theme.spacing(2),
  },
}))

const Trips = ({
  loading,
  currentLanguage,
  dateFnsLanguages,
  trips,
  totalTrips,
  fetchTrips,
  fetchFnsLanguages,
  deleteTrip,
  openModal,
}: IProps) => {
  useEffect(() => {
    fetchFnsLanguages(currentLanguage)
    fetchTrips()
  }, [currentLanguage, fetchFnsLanguages, fetchTrips])
  const classes = useStyles()

  const addTripClickHandler = () => {
    openModal({ id: 'TripAddModal' })
  }
  const editTripClickHandler = (id: string) => {
    openModal({ id: 'TripAddModal', data: {...trips[id]} })
  }
  const data = useMemo(
    () => (Object.values(trips) as any) as { [key: string]: ITrip },
    [trips]
  )
  const tripRowRenderer = (props: IPropsRow) => (
    <TripRow
      {...props}
      language={dateFnsLanguages[currentLanguage]}
      editItem={editTripClickHandler}
      deleteItem={deleteTrip}
    />
  )

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <List
            dataSource={data}
            itemCount={totalTrips}
            itemSize={46}
            rowRenderer={tripRowRenderer}
          />
          <Fab
            color="primary"
            aria-label="add"
            className={classes.addButton}
            onClick={addTripClickHandler}
          >
            <AddIcon />
          </Fab>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Trips
