import React from 'react'
import List, { IDataSourceItem } from '../List/List'

interface ITrip extends IDataSourceItem {
    creationDate: number
    distance: number
}

interface IProps {
    trips:  ReadonlyArray<ITrip>
}
const Trips = ({ trips }: IProps) => {
    const dataSource = new Map(trips.map(trip => [trip.id, trip] as [string, ITrip]));
    return <List dataSource={dataSource} itemCount={1000} itemSize={46} />
}

export default Trips;