import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {useQuery} from 'react-query';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {KEY_QUERIES} from 'config/keyQueries';
import dashboardAPI from 'services/dashboard';
import Skeleton from 'pages/Manager/DashboardPage/Skeleton';

import {green, red} from '@mui/material/colors';

const STATUS = {DOWN: 'down', UP: 'up'};

const TotalCustomers = () => {
  const {data, isLoading, isError, error} = useQuery(
    [KEY_QUERIES.FETCH_CUSTOMER],
    dashboardAPI.fetchCustomer,
  );
  if (isLoading) {
    return <Skeleton/>;
  }
  if (isError) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{justifyContent: 'space-between'}}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL CUSTOMERS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data.value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon/>
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2,
          }}
        >
          {data.status === STATUS.DOWN ? (
            <ArrowDownwardIcon sx={{color: red[900]}}/>
          ) : (
            <ArrowUpwardIcon sx={{color: green[900]}}/>
          )}
          <Typography
            variant="body2"
            sx={{
              color: data.status === STATUS.DOWN ? red[900] : green[900],
              mr: 1,
            }}
          >
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalCustomers;
