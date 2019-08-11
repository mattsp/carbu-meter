import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress'
interface IProps extends LinearProgressProps {

}
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})
const Loader = ({variant}: IProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LinearProgress variant={variant} />
    </div>
  )
}

export default Loader
