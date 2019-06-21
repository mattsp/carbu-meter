import Settings from "./components/Settings/Settings";
import Stats from "./components/Stats/Stats";
import Trips from "./components/Trips/Trips";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import RestoreIcon from '@material-ui/icons/Restore'
import { ComponentType } from "react";

export interface IRoute {
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
        path: '/',
        title: 'Trips',
    },
    {
        component: Stats,
        icon: LocationOnIcon,
        path: '/stats',
        title: 'Stats',
    },
    {
        component: Settings,
        icon: FavoriteIcon,
        path: '/settings',
        title: 'Settings',
    },

]

export default routes