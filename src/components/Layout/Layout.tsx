import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import routes, { getRouteByPath } from '../../routes';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

interface IProps extends RouteComponentProps {

}

const Layout = ({ location }: IProps) => {
    const activeRoute = getRouteByPath(location.pathname);
    const title = activeRoute ? activeRoute.title : '';
    return <Fragment>
        <Header title={title} />
        <Container maxWidth={false}>
            <Typography component="div" style={{ height: '100%' }}>
                <Switch>
                    {routes.map(route =>
                        <Route
                            key={route.id}
                            {...route}
                        />)}
                </Switch>
            </Typography>
        </Container>
        <Footer routes={routes} />
    </Fragment>
}

export default withRouter(Layout)