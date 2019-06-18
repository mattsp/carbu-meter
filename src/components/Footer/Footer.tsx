import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import RestoreIcon from '@material-ui/icons/Restore'
import { withStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
const styles = {
  stickToBottom: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
}
interface IProps extends RouteComponentProps {
  classes: any
}
interface IState {
  path: string
}
const Footer = ({ classes, history }: IProps) => {
  const [navigation, setNavigationPath] = useState<IState>({
    path: '/',
  })
  const bottomNaviationChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setNavigationPath({ path: value })
    history.push(value)
  }
  return (
    <BottomNavigation
      value={navigation.path}
      onChange={bottomNaviationChangeHandler}
      className={classes.stickToBottom}
      showLabels
    >
      <BottomNavigationAction
        label="Recents"
        icon={<RestoreIcon />}
        value="/trips"
      />
      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        value="/stats"
      />
      <BottomNavigationAction
        label="Nearby"
        icon={<LocationOnIcon />}
        value="/settings"
      />
    </BottomNavigation>
  )
}

export default withStyles(styles as any)(withRouter(Footer))
