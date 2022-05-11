import React from 'react';
import LoadingIndicator from '../../components/Icons/Loading';
import Box from '@mui/material/Box';

const loading = () => {
  return (
    <Box display="flex" alignItems="center">
      <LoadingIndicator />
    </Box>
  );
};

export default loading;
