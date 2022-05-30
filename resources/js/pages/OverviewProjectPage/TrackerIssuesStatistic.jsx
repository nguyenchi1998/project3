import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from './../../services/project';
import TableSkeleton from '../../components/TableSkeleton';
import useParamInt from '../../hooks/useParamInt';

const headers = ['', 'Open', 'Closed', 'Total'];

const TrackerIssuesStatistic = ({ projectId }) => {
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
    <TableContainer component={Paper} variant="outlined">
      <Table stickyHeader>
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
              <TableCell>{tracker.issues.open}</TableCell>
              <TableCell>{tracker.issues.closed}</TableCell>
              <TableCell>{tracker.issues.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrackerIssuesStatistic;
