import React from 'react';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';

const ForbiddenPage = ({ message }) => {
  return (
    <>
      <Helmet>
        <title>404 | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            fontWeight="bold"
            variant="h1"
          >
            Oops
          </Typography>
          <Typography align="center" color="textPrimary" variant="h5">
            {message || '403 Access Denied'}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default ForbiddenPage;
