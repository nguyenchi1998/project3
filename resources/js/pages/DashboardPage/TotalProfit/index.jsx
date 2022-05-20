import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useQuery} from 'react-query';
import {KEY_QUERIES} from 'config/keyQueries';
import dashboardAPI from 'services/dashboard';
import Skeleton from 'pages/Manager/DashboardPage/Skeleton';
import {indigo} from '@mui/material/colors';

const TotalProfit = () => {
  const {data, isLoading, isError, error} = useQuery(
    [KEY_QUERIES.FETCH_TOTAL_PROFIT],
    dashboardAPI.fetchTotalProfit,
  );
  if (isLoading) {
    return <Skeleton/>;
  }
  if (isError) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Card sx={{height: '100%'}}>
      <CardContent>
        <Grid container spacing={3} sx={{justifyContent: 'space-between'}}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL PROFIT
            </Typography>
            <Typography color="textPrimary" variant="h3">
              ${data.value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon/>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default TotalProfit;
