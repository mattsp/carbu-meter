import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import { capitalize } from '../../helper/string-helper'
const useStyles = makeStyles<Theme>({
  capitalizeText: {
    textTransform: 'capitalize',
  },
})
const Copyright = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {capitalize(`${t('copyright')} © `)}
      <Link
        className={classes.capitalizeText}
        color="inherit"
        href="https://material-ui.com/"
      >
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
      {' '}{capitalize(`${t('builtWith')} `)}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  )
}

export default Copyright
