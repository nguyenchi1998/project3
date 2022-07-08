import React, { useCallback, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  ISSUE_PRIORITIES,
  ISSUE_PRIORITY_COLORS,
  ISSUE_STATUS,
} from '../../../config/constants';
import { format } from 'date-fns';
import { PATH, PROJECT_PATH } from '../../../routes/paths';
import { useTheme } from '@emotion/react';
import ListSkeleton from './ListSkeleton';
import ListHead from './ListHead';
import Filter from './Filter';
import { makeStyles } from '@mui/styles';
import { colors, Link, Typography } from '@mui/material';
import { ProjectContext } from '../../../layouts/project';

const useStyles = makeStyles((theme) => ({
  textLink: {
    color: colors.blue[500],
    '&:hover': {
      textDecoration: 'underline !important',
    },
  },
}));

const ListIssues = ({
  debounceFilter,
  totalFilter,
  onChangeTotalFilter,
  filterOpen,
  handleToggleFilter,
}) => {
  const projectId = useContext(ProjectContext);
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_ISSUE, projectId, debounceFilter],
    () => projectAPI.getIssues({ projectId, ...debounceFilter }),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <ListSkeleton columnCount={8} />;
  }
  return (
    <Box flexGrow={1}>
      {data.length ? (
        <Box>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <TableContainer component={Paper} variant="outlined">
            <Table stickyHeader>
              <ListHead />
              <TableBody>
                {data
                  .slice(rowsPerPage * page, (page + 1) * rowsPerPage)
                  .map((issue) => (
                    <TableRow
                      hover
                      key={issue.id}
                      sx={{
                        backgroundColor: ISSUE_PRIORITY_COLORS[issue.priority],
                      }}
                    >
                      <TableCell>
                        <NavLink
                          className={classes.textLink}
                          to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${issue.id}`}
                        >
                          {issue.id}
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <Link
                          underline="hover"
                          component={NavLink}
                          to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${issue.id}`}
                        >
                          {issue.name}
                        </Link>
                      </TableCell>
                      <TableCell>{issue.tracker?.name}</TableCell>
                      <TableCell>
                        {
                          ISSUE_STATUS.find(
                            ({ value }) => value === issue.status,
                          ).label
                        }
                      </TableCell>
                      <TableCell>
                        {
                          ISSUE_PRIORITIES.find(
                            ({ value }) => value === issue.priority,
                          ).label
                        }
                      </TableCell>
                      <TableCell>
                        <Link
                          underline="hover"
                          component={NavLink}
                          to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.MEMBER}/${issue.author.id}`}
                        >
                          {issue.author.name}
                        </Link>
                      </TableCell>
                      <TableCell>{issue.assignee?.name}</TableCell>
                      <TableCell>
                        {format(new Date(issue.updated_at), 'yyyy-MM-dd HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography component={Box} textAlign="center">
          No data to display
        </Typography>
      )}
    </Box>
  );
};

export default ListIssues;
