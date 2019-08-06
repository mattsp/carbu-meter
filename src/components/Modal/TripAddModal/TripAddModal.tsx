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

interface IProps extends IModalProps {
    addTrip: (trip: ITrip) => void
}
const TripAddModal = (({ modal, open, addTrip, closeModal }: IProps) => {

    const [values, setValues] = useState<ITrip>({
        creationDate: modal.data ? new Date(modal.data.creationDate - new Date(modal.data.creationDate).getTimezoneOffset() * 60000).getTime() : Date.now(),
        distance: modal.data ? modal.data.distance : 0,
        id: modal.data ? modal.data.id : 0,
    });

    const closeHandler = () => {
        const updatedModal = { ...modal, data: values }
        addTrip(updatedModal.data as ITrip)
        closeModal(updatedModal)
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
                    error={Number(values.distance) < 0}
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
