import AppBar from '@material-ui/core/AppBar'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import routes from './route';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
})

const styles = {}

class App extends Component<any, any> {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Router>
            <AppBar position="sticky">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  Photos
                </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth={false}>
              <Typography component="div" style={{ height: '100%' }}>
                <Switch>
                  {routes.map((route, i) =>
                    <Route
                      key={i}
                      {...route}
                    />)}
                </Switch>
              </Typography>
            </Container>
            <Footer routes={routes} />
          </Router>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles as any)(App)
