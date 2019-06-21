import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import routes, { IRoute } from '../../route';
const styles = {
  stickToBottom: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
}
interface IProps extends RouteComponentProps {
  classes: any
  routes: IRoute[]
}
interface IState {
  path: string
}
const Footer = ({ classes, history }: IProps) => {
  const [navigation, setNavigationPath] = useState<IState>({
    path: '/',
  })
  const bottomNavigationChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setNavigationPath({ path: value })
    history.push(value)
  }
  return (
    <BottomNavigation
      value={navigation.path}
      onChange={bottomNavigationChangeHandler}
      className={classes.stickToBottom}
      showLabels
    >
      {routes.map((route) =>
        <BottomNavigationAction
          key={route.id}
          label={route.title}
          icon={<route.icon />}
          value={route.path}
        />
      )}
    </BottomNavigation>
  )
}

export default withStyles(styles as any)(withRouter(Footer))
