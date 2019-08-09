import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import routes, { IRoute } from '../../routes'

const useStyles = makeStyles({
  root: {
    marginTop: 'auto',
  },
  title: {
    textTransform: 'capitalize',
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
  const { t } = useTranslation();
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
            className={classes.title}
            key={route.id}
            label={t(route.title, { count: 2 })}
            icon={<route.icon />}
            value={route.path}
          />
        ))}
      </BottomNavigation>
    </footer>
  )
}

export default withRouter(Footer)
