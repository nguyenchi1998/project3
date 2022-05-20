import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import {orange} from '@mui/material/colors';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import {useQuery} from 'react-query';
import {KEY_QUERIES} from '../../../config/keyQueries';
import dashboardAPI from '../../../services/dashboard';
import Skeleton from '../Skeleton';

const TasksProgress = () => {
  const {data, isLoading, isError, error} = useQuery(
    [KEY_QUERIES.FETCH_TASK_PROGRESS],
    dashboardAPI.fetchTaskProgress,
  );

  if (isError) {
    return <Box>{error.message}</Box>;
  }

  if (isLoading) {
    return <Skeleton/>;
  }
  return (
    <Card sx={{height: '100%'}}>
      <CardContent>
        <Grid container spacing={3} sx={{justifyContent: 'space-between'}}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TASKS PROGRESS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data.value}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[600],
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon/>
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{pt: 3}}>
          <LinearProgress value={data.value} variant="determinate"/>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TasksProgress;
