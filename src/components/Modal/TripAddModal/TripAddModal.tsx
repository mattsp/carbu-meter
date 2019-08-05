import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import {IProps as IModalProps} from '../Modal';

const TripAddModal = (({modal, open, closeModal}: IModalProps) => {

    const closeHandler = () => {
        if (modal) {
            closeModal(modal)
        }
    }

    return (<Dialog open={open} onClose={closeHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Trips</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="creationDate"
                label="Creation Date"
                type="date"
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
                fullWidth
            />
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
