import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Counter from './Counter/Counter'
interface IProps {
  totalTripsDistance?: number
  fetchTotalTripsDistance: () => void
}
const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}))

const Stats = ({ totalTripsDistance, fetchTotalTripsDistance }: IProps) => {
  useEffect(() => {
      fetchTotalTripsDistance()
  }, [fetchTotalTripsDistance])
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Container className={classes.root}>
      <Counter caption={t('totalTripsDistance')} value={totalTripsDistance} />
    </Container>
  )
}

export default Stats
