import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import RestoreIcon from '@material-ui/icons/Restore'
import { ThemeProvider, withStyles } from '@material-ui/styles'
import React, { Component } from 'react'

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
})

const styles = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}

class App extends Component<any> {
  public render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Photos
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth={false}>
            <Typography component="div" style={{ height: '100%' }}>
              TEST TEXT
            </Typography>
          </Container>
          <BottomNavigation className={classes.stickToBottom} showLabels>
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles as any)(App)
