import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingIndicator from './../LoadingIndicator';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FormDialog = ({
  children,
  open,
  onSubmit,
  onClose,
  title,
  isLoading,
  isPending = false,
  maxWidth = 'sm',
  fullWidth = true,
  formId,
  actionButtonShow = true,
  disableEscapeKeyDown = true,
}) => {
  return (
    <Dialog
      open={open}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={onClose}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={onSubmit} id={formId}>
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
            children
          )}
        </form>
      </DialogContent>
      {actionButtonShow && (
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            color="error"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            color="success"
            type="submit"
            form={formId}
            disabled={isPending}
          >
            Submit
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default FormDialog;
