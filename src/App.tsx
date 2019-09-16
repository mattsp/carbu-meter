import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Layout from './components/Layout/Layout'
import ModalContainer from './containers/ModalContainer'
import NotificationContainer from './containers/NotificationContainer'
import configureStore from './store';
import Loader from './components/Loader/Loader'
import { PersistGate } from 'redux-persist/integration/react'

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
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={configureStore.store}>
          <PersistGate loading={<Loader />} persistor={configureStore.persistor}>
            <Router>
              <div className={classes.root}>
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Layout />
                    <ModalContainer />
                    <SnackbarProvider>
                      <NotificationContainer />
                    </SnackbarProvider>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </Router>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
