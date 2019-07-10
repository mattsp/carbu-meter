import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles, StyleRules, ThemeProvider } from '@material-ui/styles'
import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout/Layout'

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
})

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
})

const App = () => {
  const classes = useStyles();
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

export default App
