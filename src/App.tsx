import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import RestoreIcon from '@material-ui/icons/Restore'
import { ThemeProvider, withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
})

const styles = {
  stickToBottom: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
}

class App extends Component<any, any> {
  public state = {
    value: 'trips',
  }

  public handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    this.setState({ value: newValue })
  }

  public render() {
    const { classes } = this.props
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
                  <Route
                    exact
                    path={['/', '/trips']}
                    component={() => <div>Trips</div>}
                  />
                  <Route path="/stats" component={() => <div>Stats</div>} />
                  <Route
                    path="/settings"
                    component={() => <div>Settings</div>}
                  />
                </Switch>
              </Typography>
            </Container>
            <BottomNavigation
              value={this.state.value}
              onChange={this.handleChange}
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
          </Router>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles as any)(App)
