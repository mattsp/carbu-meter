import DateFnsUtils from "@date-io/date-fns";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { ITrip } from '../../../store/trip/types';
import { IProps as IModalProps } from '../Modal';

const TripAddModal = (({ modal, open, closeModal }: IModalProps) => {

    const [values, setValues] = useState<ITrip>({
        creationDate: new Date(modal.data.creationDate - new Date(modal.data.creationDate).getTimezoneOffset() * 60000).getTime() || Date.now(),
        distance: modal.data.distance || 0,
        id: modal.data.id,
    });

    const closeHandler = () => {
        if (modal) {
            const updatedModal = { ...modal, data: values }
            closeModal(updatedModal)
        }
    }

    const handleChange = (name: keyof ITrip) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setValues({ ...values, 'creationDate': new Date(date.toUTCString()).getTime() });
        }
    }

    return (<Dialog open={open} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Trips</DialogTitle>
        <DialogContent>
            <form noValidate autoComplete="off">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoFocus
                        margin="dense"
                        format="mm/dd/yyyy"
                        id="mui-pickers-date"
                        label="Date picker"
                        value={new Date(values.creationDate)}
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
                    label="Distance"
                    type="number"
                    required
                    error={!values.distance || Number(values.distance) < 0}
                    onChange={handleChange('distance')}
                    fullWidth
                />
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeHandler} color="primary">
                Cancel
        </Button>
            <Button onClick={closeHandler} color="primary">
                Save
        </Button>
        </DialogActions>
    </Dialog>);
})

export default TripAddModal
