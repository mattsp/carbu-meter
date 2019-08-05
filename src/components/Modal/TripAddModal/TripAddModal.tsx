import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
        </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
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
