import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
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
import { PROJECT_MEMBER_ROLES } from '../../config/constants';
import ModalIssue from '../IssuesProjectPage/ModalIssue';
import TypeIssuesStatistic from './TypeIssuesStatistic';
import IssueList from './IssueList';

const MemberList = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId],
    () => projectAPI.getMembers(projectId),
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
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Effort</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.name}>
              <TableCell>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Box mr={1}>
                    <Avatar />
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
              <TableCell>{PROJECT_MEMBER_ROLES[member.pivot.role]}</TableCell>
              <TableCell>{member.pivot.effort}</TableCell>
              <TableCell>
                <Box display="flex">
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberList;
