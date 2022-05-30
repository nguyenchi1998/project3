import { useMutation, useQuery, useQueryClient } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import { useCallback, useState } from 'react';
import trackerAPI from '../../services/tracker';
import { toast } from 'react-toastify';
import TableSkeleton from './../../components/TableSkeleton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const headers = ['Name', 'Action'];

const ListTracker = ({ debounceFilter, projectId, handleOpenEdit }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const { mutate, isLoading: isDeleteLoading } = useMutation(
    trackerAPI.destroy,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_TRACKER, projectId, { ...debounceFilter }],
          (old) => old.filter((tracker) => tracker.id !== response),
        );
        toast.success('Target version delete successfully');
      },
      onError: ({ response: { data } }) => {
        toast.error(data.message);
      },
    },
  );
  const handleDelete = (id) => {
    mutate(id);
  };
  const { data, isLoading, error, isError } = useQuery(
    [KEY_QUERIES.FETCH_TARGET_VERSION, projectId, { ...debounceFilter }],
    () => trackerAPI.all({ projectId, ...debounceFilter }),
  );
  if (isLoading) {
    return <TableSkeleton headers={headers} />;
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <Box>
      {!!data.length ? (
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
                    <TableCell width={100}>
                      <Box display="flex">
                        <IconButton onClick={() => handleOpenEdit(tracker)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={isDeleteLoading}
                          onClick={() => handleDelete(tracker.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography>No data to display</Typography>
      )}
    </Box>
  );
};
export default ListTracker;
