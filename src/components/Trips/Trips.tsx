import React, { useEffect } from 'react'
import { ITrip } from '../../store/trip/types';
import List from '../List/List'

interface IProps {
    trips: {[key: string] : ITrip},
    totalTrips: number,
    fetchTrips: () => void
}
const Trips = ({ trips, totalTrips, fetchTrips }: IProps) => {
    useEffect(() => { fetchTrips() }, [])
    return <List dataSource={trips} itemCount={totalTrips} itemSize={46} />
}

export default Trips;