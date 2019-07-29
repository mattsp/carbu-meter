import Settings from "./components/Settings/Settings";
import Stats from "./components/Stats/Stats";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import MapIcon from '@material-ui/icons/MapRounded'
import SettingsIcon from '@material-ui/icons/Settings'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import { ComponentType } from "react";
import TripsContainers from "./containers/TripsContainers";

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
        component: TripsContainers,
        exact: true,
        icon: MapIcon,
        id: 'trips',
        path: '/',
        title: 'Trips',
    },
    {
        component: Stats,
        icon: TrendingUpIcon,
        id: 'stats',
        path: '/stats',
        title: 'Stats',
    },
    {
        component: Settings,
        icon: SettingsIcon,
        id: 'settings',
        path: '/settings',
        title: 'Settings',
    },

]

export const getRouteByPath = (path: string) => routes.filter(route => route.path === path).shift()

export default routes