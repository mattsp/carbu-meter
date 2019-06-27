import React from 'react'
import List, { IDataSourceItem } from '../List/List'

interface ITrip extends IDataSourceItem {
    creationDate: number
    distance: number
}

interface IProps {
    trips: Map<string, ITrip>
}
const Trips = ({trips}:IProps) => <List dataSource={trips} itemCount={1000} itemSize={46}/>

export default Trips;