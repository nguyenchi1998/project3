import React from 'react';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProvider } from 'react-hook-form';
import LoadingIndicator from 'components/LoadingIndicator';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

const useStyle = makeStyles({
  diagramContentTop: {
    paddingTop: '8px !important',
  },
  title: {
    fontSize: 24,
  },
});

const FormDialog = ({
  children,
  open,
  onSubmit,
  onClose,
  title,
  methods,
  isLoading,
}) => {
  const style = useStyle();

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      disableEscapeKeyDown
      disableEnforceFocus
    >
      <Box position="absolute" top={8} right={4}>
        <IconButton onClick={onClose}>
          <CancelIcon />
        </IconButton>
      </Box>
      <DialogTitle className={style.title}>{title}</DialogTitle>
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
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <DialogContent className={style.diagramContentTop}>
              {children}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="error" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outlined" color="success" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      )}
    </Dialog>
  );
};

export default FormDialog;
