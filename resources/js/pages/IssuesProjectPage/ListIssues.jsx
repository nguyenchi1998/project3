import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
  PAGINATE_LIMIT,
} from '../../config/constants';
import { format } from 'date-fns';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import { ISSUE_PRIORITY_COLORS } from '../../config/constants';
import { useTheme } from '@emotion/react';
import ListSkeleton from './ListSkeleton';
import ListHead from './ListHead';

const ListIssues = ({ filter }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { projectId } = useParams();
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_ISSUE, projectId, filter],
    () => projectAPI.getIssues({ projectId, ...filter }),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <ListSkeleton />;
  }
  return (
    <Box>
      {!!data.length && (
        <Box py={1}>
          <TablePagination
            component={'div'}
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
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
                  <TableCell size="small">
                    <Link
                      to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${issue.id}`}
                    >
                      <Box color={theme.palette.text.primary}>{issue.id}</Box>
                    </Link>
                  </TableCell>
                  <TableCell size="small">
                    <Link
                      to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${issue.id}`}
                    >
                      <Box color={theme.palette.text.primary}>{issue.name}</Box>
                    </Link>
                  </TableCell>
                  <TableCell size="small">{issue.tracker?.name}</TableCell>
                  <TableCell size="small">
                    {ISSUE_STATUS[issue.status]}
                  </TableCell>
                  <TableCell size="small">
                    {ISSUE_PRIORITIES[issue.priority]}
                  </TableCell>
                  <TableCell size="small">
                    <Link to="#">
                      <Box color={theme.palette.text.primary}>
                        {issue.author.name}
                      </Box>
                    </Link>
                  </TableCell>
                  <TableCell size="small">{issue.assignee?.name}</TableCell>
                  <TableCell size="small">
                    {format(new Date(issue.updated_at), 'yyyy/MM/dd HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListIssues;
