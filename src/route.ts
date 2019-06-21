import Settings from "./components/Settings/Settings";
import Stats from "./components/Stats/Stats";
import Trips from "./components/Trips/Trips";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import RestoreIcon from '@material-ui/icons/Restore'
import { ComponentType } from "react";

export interface IRoute {
    id:string
    component: () => JSX.Element
    exact?: boolean
    icon: ComponentType<SvgIconProps>
    path: string
    title: string
}
const routes: IRoute[] = [
    {
        component: Trips,
        exact: true,
        icon: RestoreIcon,
        id: 'trips',
        path: '/',
        title: 'Trips',
    },
    {
        component: Stats,
        icon: LocationOnIcon,
        id: 'stats',
        path: '/stats',
        title: 'Stats',
    },
    {
        component: Settings,
        icon: FavoriteIcon,
        id: 'settings',
        path: '/settings',
        title: 'Settings',
    },

]

export default routes