import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

const ConfirmDialog = ({
  open,
  message = 'Are you sure to action?',
  onConfirm,
  onCancel,
  title = 'Warning Action',
  confirmButtonText = 'Agree',
  cancelButtonText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      disableEscapeKeyDown
      disableEnforceFocus
    >
      <DialogTitle style={{ fontSize: 20, fontWeight: 'bold' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onCancel}>
          {cancelButtonText}
        </Button>
        <Button color="success" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
