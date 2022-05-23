import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';
import { green, red } from '@mui/material/colors';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from 'config/keyQueries';
import dashboardAPI from 'services/dashboard';
import Skeleton from 'pages/Manager/DashboardPage/Skeleton';

const STATUS = { DOWN: 'down', UP: 'up' };

const Budget = () => {
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_BUDGET],
    dashboardAPI.fetchBudget,
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              BUDGET
            </Typography>
            <Typography color="textPrimary" variant="h3">
              $ {data.value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {data.status === STATUS.DOWN ? (
            <ArrowDownwardIcon sx={{ color: red[900] }} />
          ) : (
            <ArrowUpwardIcon sx={{ color: green[900] }} />
          )}
          <Typography
            sx={{
              color: data.status === STATUS.DOWN ? red[900] : green[900],
              mr: 1,
            }}
            variant="body2"
          >
            {data.percent}%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Budget;
