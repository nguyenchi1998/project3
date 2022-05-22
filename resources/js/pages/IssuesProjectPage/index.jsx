import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import {
  Button,
  colors,
  Container,
  Link,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
  PAGINATE_LIMIT,
} from '../../config/constants';
import { format } from 'date-fns';
import ModalIssue from './ModalIssue';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import { ISSUE_PRIORITY_COLORS } from '../../config/constants';
import { useTheme } from '@emotion/react';

const IssuesProjectPage = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const { projectId, issueId } = useParams();
  const [openIssue, setOpenIssue] = useState(false);
  const handleCloseIssue = useCallback(() => {
    setOpenIssue(false);
  }, []);
  const handleOpenIssue = useCallback(() => {
    setOpenIssue(true);
  }, []);
  const handlePageChange = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_ISSUE, projectId],
    () => projectAPI.getIssues(projectId),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        {isSuccess && !!data.length && (
          <Pagination
            count={Math.ceil(data.length / PAGINATE_LIMIT)}
            page={page}
            defaultPage={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        )}
        <Box
          py={1}
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Typography flexGrow={1} variant="h6" component={Box}>
            Issues
          </Typography>
          <Button variant="outlined" onClick={handleOpenIssue}>
            New Issue
          </Button>
        </Box>
        <TableContainer component={Paper} variant="outlined">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Tracker</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(PAGINATE_LIMIT * (page - 1), page * PAGINATE_LIMIT)
                .map((issue) => (
                  <TableRow
                    hover
                    key={issue.id}
                    sx={{
                      backgroundColor: ISSUE_PRIORITY_COLORS[issue.priority],
                    }}
                  >
                    <TableCell>
                      <Link
                        href={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${issue.id}`}
                        underline="hover"
                      >
                        <Box color={theme.palette.text.primary}>{issue.id}</Box>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${issue.id}`}
                        underline="hover"
                      >
                        <Box color={theme.palette.text.primary}>
                          {issue.name}
                        </Box>
                      </Link>
                    </TableCell>
                    <TableCell>{issue.tracker?.name}</TableCell>
                    <TableCell>{ISSUE_STATUS[issue.status]}</TableCell>
                    <TableCell>{ISSUE_PRIORITIES[issue.priority]}</TableCell>
                    <TableCell>
                      <Link href="#" underline="hover">
                        <Box color={theme.palette.text.primary}>
                          {issue.author.name}
                        </Box>
                      </Link>
                    </TableCell>
                    <TableCell>{issue.assignee?.name}</TableCell>
                    <TableCell>
                      {format(new Date(issue.updated_at), 'yyyy/MM/dd hh:mm')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {openIssue && (
        <ModalIssue open={openIssue} handleClose={handleCloseIssue} />
      )}
    </Container>
  );
};

export default IssuesProjectPage;
