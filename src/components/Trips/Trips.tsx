import React from 'react'
import { ITrip } from '../../store/trip/types';
import List from '../List/List'

interface IProps {
    trips:  Map<string, ITrip>,
    fetchTrips: () => void
}
const Trips = ({ trips }: IProps) => {
    const dataSource = new Map(Array.from(trips.values()).map(trip => [trip.id, trip] as [string, ITrip]));
    return <List dataSource={dataSource} itemCount={1000} itemSize={46} />
}

export default Trips;