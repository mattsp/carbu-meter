import { ComponentType, lazy } from 'react';

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import MapIcon from '@material-ui/icons/MapRounded'
import SettingsIcon from '@material-ui/icons/Settings'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'

const TripsContainer = lazy(() => import('./containers/TripsContainer'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const StatsContainer = lazy(() => import('./containers/StatsContainer'));

export interface IRoute {
    id: string
    component: any;
    exact?: boolean
    icon: ComponentType<SvgIconProps>
    path: string
    title: string
}

const routes: IRoute[] = [
    {
        component: TripsContainer,
        exact: true,
        icon: MapIcon,
        id: 'trips',
        path: '/',
        title: 'trip',
    },
    {
        component: StatsContainer,
        icon: TrendingUpIcon,
        id: 'stats',
        path: '/stats',
        title: 'stat',
    },
    {
        component: Settings,
        icon: SettingsIcon,
        id: 'settings',
        path: '/settings',
        title: 'setting',
    },

]

export const getRouteByPath = (path: string) => routes.filter(route => route.path === path).shift()

export default routes