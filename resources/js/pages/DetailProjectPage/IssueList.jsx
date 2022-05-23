import React, { useCallback, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import DeleteIcon from '@mui/icons-material/Delete';
import { Doughnut } from 'react-chartjs-2';
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
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
} from '../../config/constants';
import { format } from 'date-fns';

const priorityColor = ['unset', 'unset', colors.pink[100], colors.red[300]];

const IssueList = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_TASK, projectId],
    () => projectAPI.getIssues({ projectId }),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Tracker</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((task) => (
            <TableRow
              hover
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
              <TableCell>{task.tracker?.name}</TableCell>
              <TableCell>{ISSUE_STATUS[task.status]}</TableCell>
              <TableCell>{ISSUE_PRIORITIES[task.priority]}</TableCell>
              <TableCell>{task.author?.name}</TableCell>
              <TableCell>{task.assignee?.name}</TableCell>
              <TableCell>
                {format(new Date(task.updated_at), 'yyyy/MM/dd hh:mm')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IssueList;
