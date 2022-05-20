import React from 'react';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';

const DashboardPage = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    ></Box>
  </>
);

export default DashboardPage;
