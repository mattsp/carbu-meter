import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack';
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Layout from './components/Layout/Layout'
import ModalContainer from './containers/ModalContainer';
import NotificationContainer from './containers/NotificationContainer';
import { store } from './store';
import i18next from 'i18next';
import { SET_CURRENT_LANGUAGE } from './store/locale/types';

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
i18next.on('languageChanged', (lng)=> {
  store.dispatch({type: SET_CURRENT_LANGUAGE, payload: lng})
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
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <Layout />
                  <ModalContainer />
                  <SnackbarProvider>
                    <NotificationContainer />
                  </SnackbarProvider>
                </Suspense>
              </ErrorBoundary>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
