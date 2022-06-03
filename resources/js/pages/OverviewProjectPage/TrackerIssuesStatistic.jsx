import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from './../../services/project';
import TableSkeleton from '../../components/TableSkeleton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import queryString from 'query-string';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../../layouts/project';

const headers = ['', 'Open', 'Closed', 'Total'];

const TrackerIssuesStatistic = () => {
  const projectId = useContext(ProjectContext);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_TRACKER_ISSUE_STATISTIC, projectId],
    () => projectAPI.trackerIssuesStatistic(projectId),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <TableSkeleton numberRow={5} headers={headers} />;
  }
  return (
    <>
      <Box py={1}>
        <Typography variant="h5">Issue Tracking</Typography>
      </Box>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((tracker) => (
              <TableRow key={tracker.id}>
                <TableCell>{tracker.name}</TableCell>
                <TableCell>
                  <Link
                    component={NavLink}
                    to={`${PATH.PROJECT_PAGE}/${projectId}/${
                      PROJECT_PATH.ISSUE
                    }?${queryString.stringify({
                      trackerId: tracker.id,
                    })}`}
                    underline="hover"
                  >
                    {tracker.issues.open}
                  </Link>
                </TableCell>
                <TableCell>{tracker.issues.closed}</TableCell>
                <TableCell>{tracker.issues.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TrackerIssuesStatistic;
