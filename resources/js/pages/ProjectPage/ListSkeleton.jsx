import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

const ListSkeleton = ({ numberRow = 5 }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {[...Array(numberRow).keys()].map((i) => (
          <Grid key={i} item xs={12} sm={6} lg={4} xl={3}>
            <Skeleton sx={{ height: 200 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListSkeleton;
