import React, { useEffect } from 'react'
import { ITrip } from '../../store/trip/types';
import List from '../List/List'

interface IProps {
    trips: Map<string, ITrip>,
    totalTrips: number,
    fetchTrips: () => void
}
const Trips = ({ trips, totalTrips, fetchTrips }: IProps) => {
    useEffect(() => { fetchTrips() }, [])
    const dataSource = new Map(Array.from(trips.values()).map(trip => [trip.id, trip] as [string, ITrip]));
    return <List dataSource={dataSource} itemCount={totalTrips} itemSize={46} />
}

export default Trips;