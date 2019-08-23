import { makeStyles, Theme, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import CountUp from 'react-countup'
import Loader from '../../Loader/Loader';

interface IProps {
  caption?: string
  value?: number
}
const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  caption: {
    textTransform: 'capitalize'
  }
}))
const Counter = ({ caption, value }: IProps) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root} elevation={2}>
      {caption && <Typography className={classes.caption} variant="caption">{caption}</Typography>}
      {value === undefined ? (
        <Loader />
      ) : (
        <CountUp end={value} delay={0}>
          {({ countUpRef }) => (
            <Typography variant="h3" noWrap>
              <span ref={countUpRef} /> Km
            </Typography>
          )}
        </CountUp>
      )}
    </Paper>
  )
}

export default Counter
