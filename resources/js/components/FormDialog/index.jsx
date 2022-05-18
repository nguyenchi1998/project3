import React, { useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingIndicator from './../LoadingIndicator';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

const FormDialog = ({
  children,
  open,
  onSubmit,
  onClose,
  title,
  methods,
  isLoading,
  maxWidth = 'sm',
}) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
      disableEscapeKeyDown
      disableEnforceFocus
    >
      <DialogTitle>{title}</DialogTitle>
      {isLoading ? (
        <Box
          height="40vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LoadingIndicator />
        </Box>
      ) : (
        <form onSubmit={onSubmit}>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              autoFocus
              color="error"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button color="success" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default FormDialog;
