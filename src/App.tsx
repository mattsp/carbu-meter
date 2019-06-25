import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider, withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout/Layout'

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
})

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}

class App extends Component<any, any> {
  public render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Router>
            <div className={classes.root}>
              <Layout />
            </div>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles as any)(App)
