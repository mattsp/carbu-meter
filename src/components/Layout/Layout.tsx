import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom'
import routes, { getRouteByPath } from '../../routes'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { withStyles } from '@material-ui/styles'
import { StyledComponentProps } from '@material-ui/core'

interface IProps extends RouteComponentProps, StyledComponentProps {}

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

const Layout = ({ location, classes = {} }: IProps) => {
  const activeRoute = getRouteByPath(location.pathname)
  const title = activeRoute ? activeRoute.title : ''
  return (
    <Fragment>
      {activeRoute && activeRoute.showHeader === true && <Header title={title} />}
      <Container className={classes.content} maxWidth={false}>
        <Typography className={classes.absoluteItem} component="div">
          <Switch>
            {routes.map(route => (
              <Route key={route.id} {...route} />
            ))}
          </Switch>
        </Typography>
      </Container>
      {activeRoute && activeRoute.showFooter === true && <Footer routes={routes} />}
    </Fragment>
  )
}

export default withRouter(withStyles(styles as any)(Layout))
