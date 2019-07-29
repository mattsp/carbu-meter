import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { store } from './store';

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
        <Provider store={store}>
          <Router>
            <div className={classes.root}>
              <Layout />
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
