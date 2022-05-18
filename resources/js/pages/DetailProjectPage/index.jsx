import React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import ListSkeleton from '../ProjectPage/ListSkeleton';
import { Doughnut } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  PROJECT_MEMBER_ROLES,
  TASK_PRIORITIES,
  TASK_STATUS,
  TASK_TYPES,
} from '../../config/constants';
import { colors, useTheme } from '@mui/material';

const DetailProjectPage = () => {
  const theme = useTheme();

  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, projectId],
    () => projectAPI.find(projectId),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="text.primary" variant="body1" gutterBottom>
                Task
              </Typography>
              <Typography variant="body2" component="div">
                {data.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="text.primary" variant="body1" gutterBottom>
                Bug
              </Typography>
              <Typography variant="body2" component="div">
                {data.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="text.primary" variant="body1" gutterBottom>
                Backlog
              </Typography>
              <Typography variant="body2" component="div">
                {data.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="text.primary" variant="body1" gutterBottom>
                Cancel
              </Typography>
              <Typography variant="body2" component="div">
                {data.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Box>
              <Box py={1}>
                <Typography>Project Tasks</Typography>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Task</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Box fontWeight={'bold'}>{task.name}</Box>
                        </TableCell>
                        <TableCell>{TASK_TYPES[task.type]}</TableCell>
                        <TableCell>{TASK_PRIORITIES[task.priority]}</TableCell>
                        <TableCell>{TASK_STATUS[task.status]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Box
            py={2}
            sx={{
              height: 300,
              position: 'relative',
            }}
          >
            <Doughnut
              data={{
                datasets: [
                  {
                    data: [63, 15, 12, 10],
                    backgroundColor: [
                      colors.red[600],
                      colors.orange[600],
                      colors.indigo[500],
                      colors.grey[500],
                    ],
                    borderWidth: 8,
                    borderColor: colors.common.white,
                    hoverBorderColor: colors.common.white,
                  },
                ],
                labels: ['Bug', 'Task', 'Backlog', 'Cancel'],
              }}
              options={{
                animation: false,
                cutoutPercentage: 80,
                layout: { padding: 0 },
                legend: {
                  display: false,
                },
                maintainAspectRatio: false,
                responsive: true,
                tooltips: {
                  backgroundColor: theme.palette.background.paper,
                  bodyFontColor: theme.palette.text.secondary,
                  borderColor: theme.palette.divider,
                  borderWidth: 1,
                  enabled: true,
                  footerFontColor: theme.palette.text.secondary,
                  intersect: false,
                  mode: 'index',
                  titleFontColor: theme.palette.text.primary,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DetailProjectPage;
