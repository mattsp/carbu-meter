import { ComponentType, lazy } from 'react';

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import MapIcon from '@material-ui/icons/MapRounded'
import SettingsIcon from '@material-ui/icons/Settings'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import SignIn from './components/SignIn/SignIn';

const TripsContainer = lazy(() => import('./containers/TripsContainer'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const StatsContainer = lazy(() => import('./containers/StatsContainer'));
const SignUpContainer = lazy(() => import('./containers/SignUpContainer'));
export interface IRoute {
    id: string
    component: any;
    exact?: boolean
    icon: ComponentType<SvgIconProps>
    path: string | string[]
    title: string
    showHeader: boolean
    showFooter: boolean
    includeIntoFooter: boolean
}

const routes: IRoute[] = [
    {
        component: SignIn,
        exact: true,
        icon: MapIcon,
        id: 'signIn',
        path: ['/', '/signIn'],
        showHeader: false,
        showFooter: false,
        includeIntoFooter: false,
        title: 'signIn',
    },
    {
        component: SignUpContainer,
        icon: MapIcon,
        id: 'signUp',
        path: '/signUp',
        showHeader: false,
        showFooter: false,
        includeIntoFooter: false,
        title: 'signUp',
    },
    {
        component: TripsContainer,
        icon: MapIcon,
        id: 'trips',
        path: '/trips',
        title: 'trip',
        showHeader: true,
        showFooter: true,
        includeIntoFooter: true,
    },
    {
        component: StatsContainer,
        icon: TrendingUpIcon,
        id: 'stats',
        path: '/stats',
        title: 'stat',
        showHeader: true,
        showFooter: true,
        includeIntoFooter: true,
    },
    {
        component: Settings,
        icon: SettingsIcon,
        id: 'settings',
        path: '/settings',
        title: 'setting',
        showHeader: true,
        showFooter: true,
        includeIntoFooter: true,
    },

]

export const getRouteByPath = (path: string) => routes.filter(route => route.path === path).shift()

export default routes