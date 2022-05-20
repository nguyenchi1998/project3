import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const PendingButton = ({text, pending, ...rest}) => {
  return (
    <Button {...rest}>
      {pending ? (
        <CircularProgress color="secondary" size={24} thickness={4}/>
      ) : (
        text
      )}
    </Button>
  );
};

export default PendingButton;
