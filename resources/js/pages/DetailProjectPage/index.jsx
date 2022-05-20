import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {KEY_QUERIES} from '../../config/keyQueries';
import projectAPI from '../../services/project';
import DeleteIcon from '@mui/icons-material/Delete';
import {Doughnut} from 'react-chartjs-2';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  colors,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import {
  PROJECT_MEMBER_ROLES,
  TASK_PRIORITIES,
  TASK_STATUS,
  TASK_TYPES,
} from '../../config/constants';
import {format} from 'date-fns';
import ModalTask from './ModalTask';

const priorityColor = ['unset', 'unset', colors.pink[100], colors.red[300]];

const DetailProjectPage = () => {
  const theme = useTheme();
  const doughnutOption = {
    animation: false,
    cutoutPercentage: 80,
    layout: {padding: 0},
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
  };
  const {projectId} = useParams();
  const [openTask, setOpenTask] = useState(false);
  const handleOpenTask = useCallback(() => {
    setOpenTask(true);
  }, []);
  const handleCloseTask = useCallback(() => {
    setOpenTask(false);
  }, []);
  const {data, isLoading, isError, error} = useQuery(
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
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Box>
                  <Box
                    py={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box flexGrow={1}>
                      <Typography>Project Tasks</Typography>
                    </Box>
                    <Button variant="outlined" onClick={handleOpenTask}>
                      Create Task
                    </Button>
                  </Box>
                  <TableContainer component={Paper} variant="outlined">
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Task</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Priority</TableCell>
                          <TableCell>Author</TableCell>
                          <TableCell>Assignee</TableCell>
                          <TableCell>Updated</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.tasks.map((task) => (
                          <TableRow
                            key={task.id}
                            sx={{
                              backgroundColor: priorityColor[task.priority],
                            }}
                          >
                            <TableCell>{task.id}</TableCell>
                            <TableCell component="th" scope="row">
                              <Box fontWeight={'bold'}>
                                <Link to="#">{task.name}</Link>
                              </Box>
                            </TableCell>
                            <TableCell>{TASK_TYPES[task.type]}</TableCell>
                            <TableCell>{TASK_STATUS[task.status]}</TableCell>
                            <TableCell>
                              {TASK_PRIORITIES[task.priority]}
                            </TableCell>
                            <TableCell>{task.author?.name}</TableCell>
                            <TableCell>{task.assignee?.name}</TableCell>
                            <TableCell>
                              {format(
                                new Date(task.updated_at),
                                'yyyy/MM/dd hh:mm',
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <TableContainer component={Paper} sx={{maxHeight: '45vh'}}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.members.map((member) => (
                  <TableRow key={member.name}>
                    <TableCell>
                      <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Box mr={1}>
                          <Avatar/>
                        </Box>
                        <Box>
                          <Typography>{member.name}</Typography>
                          <Typography>
                            {!!member?.group &&
                              `${member?.group?.name} - ${member?.group?.division?.name}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {PROJECT_MEMBER_ROLES[member.pivot.role]}
                    </TableCell>
                    <TableCell>
                      <Box display="flex">
                        <IconButton>
                          <DeleteIcon color="error"/>
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item xs={12}>
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
                options={doughnutOption}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {openTask && <ModalTask open={openTask} handleClose={handleCloseTask}/>}
    </Box>
  );
};
export default DetailProjectPage;
