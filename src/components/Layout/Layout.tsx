import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, { Fragment, useLayoutEffect } from 'react'
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom'
import routes, { getRouteByPath } from '../../routes'
import Footer from '../Footer/Footer'
import { withStyles } from '@material-ui/styles'
import { StyledComponentProps } from '@material-ui/core'
import PrivateRoute from '../PriavteRoute/PrivateRoute'
import { IUser } from '../../store/user/types'
import firebase from 'firebase/app'
import 'firebase/auth'
import HeaderContainer from '../../containers/HeaderContainer'

interface IProps extends RouteComponentProps, StyledComponentProps {
  user?: IUser
  rememberUser?: boolean
}

const styles = {
  absoluteItem: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  content: {
    flex: '1',
    position: 'relative',
  },
}

const Layout = ({ location, user, rememberUser, classes = {} }: IProps) => {
  const activeRoute = getRouteByPath(location.pathname)
  const title = activeRoute ? activeRoute.title : ''
  useLayoutEffect(()=>{
    firebase.auth().onAuthStateChanged(authUser => {
        authUser
        ? localStorage.setItem('authUser', authUser.uid)
        : localStorage.removeItem('authUser')
    });
  }, [])
  return (
    <Fragment>
      {activeRoute && activeRoute.showHeader === true && (
        <HeaderContainer title={title} />
      )}
      <Container component="main" maxWidth={false} className={classes.content}>
        <Typography className={classes.absoluteItem} component="div">
          <Switch>
            {routes.map(route =>
              route.private ? (
                <PrivateRoute
                  key={route.id}
                  authenticated={!!user || !!(rememberUser && !!localStorage.getItem('authUser'))}
                  {...route}
                />
              ) : (
                <Route key={route.id} {...route} />
              )
            )}
          </Switch>
        </Typography>
      </Container>
      {activeRoute && activeRoute.showFooter === true && (
        <Footer routes={routes} />
      )}
    </Fragment>
  )
}

export default withRouter(withStyles(styles as any)(Layout))
