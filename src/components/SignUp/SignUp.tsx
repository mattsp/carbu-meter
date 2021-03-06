import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Copyright from '../Copyright/Copyright'
import { capitalize } from '../../helper/string-helper'
import { IUser } from '../../store/user/types'

const useStyles = makeStyles<Theme>(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  capitalizeText: {
    textTransform: 'capitalize',
  },
  submit: {
    textTransform: 'capitalize',
    margin: theme.spacing(3, 0, 2),
  },
}))

interface IProps extends RouteComponentProps {
  createUser: (user: IUser) => Promise<void>
}

const SignUp = ({ createUser, history }: IProps) => {
  const [values, setValues] = useState<IUser>({
    email: '',
    password: '',
  })

  const [firstNameError, setFirstNameError] = useState({
    error: false,
    errorMsg: '',
  })
  const [lastNameError, setLastNameError] = useState({
    error: false,
    errorMsg: '',
  })
  const [emailError, setEmailError] = useState({ error: false, errorMsg: '' })
  const [passwordError, setPasswordError] = useState({
    error: false,
    errorMsg: '',
  })

  const handleChange = (name: keyof IUser) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = () => {
    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.password
    ) {
      if (!values.firstName) {
        setFirstNameError({
          error: true,
          errorMsg: t('requiredField'),
        })
      } else {
        setFirstNameError({
          error: false,
          errorMsg: '',
        })
      }
      if (!values.lastName) {
        setLastNameError({
          error: true,
          errorMsg: t('requiredField'),
        })
      } else {
        setLastNameError({
          error: false,
          errorMsg: '',
        })
      }
      if (!values.email) {
        setEmailError({
          error: true,
          errorMsg: t('requiredField'),
        })
      } else {
        setEmailError({
          error: false,
          errorMsg: '',
        })
      }
      if (!values.password) {
        setPasswordError({
          error: true,
          errorMsg: t('requiredField'),
        })
      } else {
        setPasswordError({
          error: false,
          errorMsg: '',
        })
      }
    } else {
      createUser(values as IUser)
        .then(() => {
          history.push('signIn')
        })
        .catch((error: firebase.auth.Error) => {
          if (
            error.code.indexOf('auth/invalid-email') >= 0 ||
            error.code.indexOf('auth/email-already-in-use') >= 0
          ) {
            setEmailError({
              error: true,
              errorMsg: t(error.code.replace('/', '.')),
            })
          } else {
            setEmailError({ error: false, errorMsg: '' })
          }
          if (error.code.indexOf('auth/weak-password') >= 0) {
            setPasswordError({
              error: true,
              errorMsg: t(error.code.replace('/', '.')),
            })
          } else {
            setPasswordError({ error: false, errorMsg: '' })
          }
        })
    }
  }

  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          className={classes.capitalizeText}
          component="h1"
          variant="h5"
        >
          {t('signUp')}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.capitalizeText}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={`${t('firstName')}`}
                autoFocus
                onChange={handleChange('firstName')}
                error={firstNameError.error}
                helperText={firstNameError.errorMsg}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.capitalizeText}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={`${t('lastName')}`}
                name="lastName"
                autoComplete="lname"
                onChange={handleChange('lastName')}
                error={lastNameError.error}
                helperText={lastNameError.errorMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.capitalizeText}
                variant="outlined"
                required
                fullWidth
                id="email"
                label={`${t('email')} ${t('address')}`}
                name="email"
                autoComplete="email"
                onChange={handleChange('email')}
                error={emailError.error}
                helperText={emailError.errorMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={capitalize(t('password'))}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange('password')}
                error={passwordError.error}
                helperText={passwordError.errorMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label={`${capitalize(t('extraEmails'))} .`}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {t('signUp')}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                component={({ className }) => (
                  <NavLink className={className} to="/signIn" title="signUp">
                    {capitalize(`${t('alreadyAccount')}?`)}{' '}
                    {capitalize(`${t('signIn')}`)}
                  </NavLink>
                )}
                variant="body2"
              ></Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default withRouter(SignUp)
