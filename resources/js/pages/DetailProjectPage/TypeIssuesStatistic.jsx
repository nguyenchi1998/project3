import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from './../../services/project';

const TypeIssuesStatistic = () => {
  const { projectId } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_TYPE_TASK_STATISTIC, projectId],
    () => projectAPI.trackerIssuesStatistic(projectId),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  return (
    <TableContainer component={Paper} variant={'outlined'}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Open</TableCell>
            <TableCell>Closed</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((tracker) => (
            <TableRow key={tracker.id}>
              <TableCell>{tracker.name}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{tracker.issues.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TypeIssuesStatistic;
