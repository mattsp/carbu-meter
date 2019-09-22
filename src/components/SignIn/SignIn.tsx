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
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom'
import { Container } from '@material-ui/core'
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
    marginTop: theme.spacing(1),
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
  singInUser: (user: IUser, rememberMe:boolean ) => Promise<void>
}

const SignIn = ({ singInUser, history }: IProps) => {
  let rememberMe: boolean = false

  const [values, setValues] = useState<IUser>({
    email: '',
    password: '',
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

  const handleChangeRemember = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    rememberMe = checked
  }

  const { t } = useTranslation()

  const onClickSubmitHandler = () => {
    singInUser(values as IUser, rememberMe)
      .then(() => {
        history.push('/trips')
      })
      .catch((error: firebase.auth.Error) => {
        if (
          error.code.indexOf('auth/invalid-email') >= 0 ||
          error.code.indexOf('auth/user-not-found') >= 0
        ) {
          setEmailError({
            error: true,
            errorMsg: t(error.code.replace('/', '.')),
          })
        } else {
          setEmailError({ error: false, errorMsg: '' })
        }
        if (error.code.indexOf('auth/wrong-password') >= 0) {
          setPasswordError({
            error: true,
            errorMsg: t(error.code.replace('/', '.')),
          })
        } else {
          setPasswordError({ error: false, errorMsg: '' })
        }
      })
  }

  const classes = useStyles()
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
          {t('signIn')}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            className={classes.capitalizeText}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={`${t('email')} ${t('address')}`}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange('email')}
            error={emailError.error}
            helperText={emailError.errorMsg}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleChangeRemember}
              />
            }
            label={capitalize(t('rememberMe'))}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClickSubmitHandler}
          >
            {t('signIn')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {capitalize(t('forgotPassword'))}?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={({ className }) => (
                  <NavLink className={className} to="/signUp" title="signUp">
                    {capitalize(`${t('alreadyAccount')}?`)}{' '}
                    {capitalize(`${t('signUp')}`)}
                  </NavLink>
                )}
                variant="body2"
              ></Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default withRouter(SignIn)
