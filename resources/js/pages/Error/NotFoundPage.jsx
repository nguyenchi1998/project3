import React from 'react';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NotFoundImage from '../../static/image/not_found.png';

const NotFoundPage = () => {
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
          <Typography align="center" color="textPrimary" variant="h5">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src={NotFoundImage}
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFoundPage;
