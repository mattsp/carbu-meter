import DateFnsUtils from '@date-io/date-fns'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localToUtc, utcToLocale } from '../../../helper/date-helper'
import { ITrip } from '../../../store/trip/types'
import { IProps as IModalProps } from '../Modal'
import Slide from '@material-ui/core/Slide'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { isValid } from 'date-fns'

const useStyles = makeStyles({
  title: {
    textTransform: 'capitalize',
  },
})
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
}) as any
interface IProps extends IModalProps {
  currentLanguage: string
  dateFnsLanguages: { [key: string]: any }
  fetchFnsLanguages: (language: string) => void
  addTrip: (trip: ITrip) => void
  editTrip: (trip: ITrip) => void
}
const TripAddModal = ({
  modal,
  open,
  currentLanguage,
  dateFnsLanguages,
  fetchFnsLanguages,
  addTrip,
  editTrip,
  closeModal,
}: IProps) => {
  const [values, setValues] = useState<ITrip>({
    creationDate: Date.now(),
    distance: undefined,
    id: '',
    userRef: undefined,
  })

  const [distanceError, setDistanceError] = useState(false)
  const [dateError, setDateError] = useState(false)

  useEffect(() => {
    fetchFnsLanguages(currentLanguage)
    if (modal.data) {
      setValues({
        creationDate: utcToLocale(modal.data.creationDate).getTime(),
        distance: modal.data.distance,
        id: modal.data.id,
      })
    } else {
      setValues({
        creationDate: Date.now(),
        distance: undefined,
        id: '',
      })
    }
  }, [currentLanguage, fetchFnsLanguages, modal])
  const closeHandler = (reason: 'cancel' | 'save') => {
    if (reason === 'save' && !distanceError) {
      if (!values.distance) {
        setDistanceError(true)
      }
      if (!values.creationDate) {
        setDateError(true)
      }
      if (!dateError && !distanceError) {
        const newValues = { ...values, distance: Number(values.distance) }
        const updatedModal = { ...modal, data: newValues }
        if (values.id) {
          editTrip(updatedModal.data as ITrip)
        } else {
          addTrip(updatedModal.data as ITrip)
        }
        closeModal(updatedModal)
      }
    } else if (reason === 'cancel') {
      closeModal(modal)
    }
  }

  const handleChange = (name: keyof ITrip) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (name === 'distance' && !event.target.value) {
      setDistanceError(true)
    } else {
      setDistanceError(false)
    }
    setValues({ ...values, [name]: event.target.value })
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateError(!isValid(date))
      setValues({
        ...values,
        creationDate: localToUtc(date.getTime()).getTime(),
      })
    }
  }

  const handleOnBlurDate = () => {
    if (!values.creationDate) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }

  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={closeHandler}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className={classes.title} id="form-dialog-title">
        {t('newTrip')}
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={dateFnsLanguages[currentLanguage]}
          >
            <KeyboardDatePicker
              onBlur={handleOnBlurDate}
              allowKeyboardControl={false}
              autoFocus
              margin="dense"
              format="MM/dd/yyyy"
              id="creationDate"
              label={t('day')}
              value={new Date(values.creationDate)}
              error={dateError}
              onChange={handleDateChange}
              required
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            id="distance"
            label={t('distance')}
            value={values.distance}
            type="number"
            required
            error={Number(values.distance) < 0 || distanceError}
            onChange={handleChange('distance')}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            closeHandler('cancel')
          }}
          color="primary"
        >
          {t('cancel')}
        </Button>
        <Button
          onClick={() => {
            closeHandler('save')
          }}
          color="primary"
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TripAddModal
