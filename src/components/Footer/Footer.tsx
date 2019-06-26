import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import routes, { IRoute } from '../../routes'

const useStyles = makeStyles({
  root: {
    marginTop: 'auto',
  },
})

interface IProps extends RouteComponentProps {
  routes: IRoute[]
}
interface IState {
  path: string
}
const Footer = ({ history }: IProps) => {
  const classes = useStyles();
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
    <footer>
      <BottomNavigation
        value={navigation.path}
        onChange={bottomNavigationChangeHandler}
        className={classes.root}
        showLabels
      >
        {routes.map(route => (
          <BottomNavigationAction
            key={route.id}
            label={route.title}
            icon={<route.icon />}
            value={route.path}
          />
        ))}
      </BottomNavigation>
    </footer>
  )
}

export default withStyles(styles as any)(withRouter(Footer))
