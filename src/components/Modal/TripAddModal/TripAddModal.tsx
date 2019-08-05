import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { ITrip } from '../../../store/trip/types';
import { IProps as IModalProps } from '../Modal';

const TripAddModal = (({ modal, open, closeModal }: IModalProps) => {

    const [values, setValues] = useState<ITrip>({
        creationDate: Date.now(),
        distance: -1,
        id: '',
    });

    const closeHandler = () => {
        if (modal) {
            closeModal(modal)
        }
    }

    const handleChange = (name: keyof ITrip) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (<Dialog open={open} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Trips</DialogTitle>
        <DialogContent>
            <form noValidate autoComplete="off">
                <TextField
                    autoFocus
                    margin="dense"
                    id="creationDate"
                    label="Creation Date"
                    type="date"
                    required
                    onChange={handleChange('creationDate')}
                    error= {!values.creationDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="distance"
                    label="Distance"
                    type="number"
                    required
                    error= {!values.distance || Number(values.distance) < 0 }
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
