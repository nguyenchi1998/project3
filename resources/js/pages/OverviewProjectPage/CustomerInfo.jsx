import { Box, Paper } from '@mui/material';
import { useContext } from 'react';
import { ProjectContext } from '../../layouts/project';

const CustomerInfo = () => {
  const projectId = useContext(ProjectContext);

  return (
    <Paper variant="outlined">
      <Box>Name:</Box>
    </Paper>
  );
};
export default CustomerInfo;
