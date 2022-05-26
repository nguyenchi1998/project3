import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import trackerAPI from '../../services/tracker';
import ModalTracker from './ModalTracker';
import ListSkeleton from './ListSkeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDebounce from '../../hooks/useDebounce';
import useQueryParam from '../../hooks/useQueryParam';
import { KEY_QUERIES } from '../../config/keyQueries';
import { toast } from 'react-toastify';

const TrackerPage = () => {
  const queryClient = useQueryClient();
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    keyword: '',
    ...params,
  });
  const [action, setAction] = useState(null);
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const handleTrackerClose = useCallback(() => {
    setAction(null);
    setSelectedTracker(null);
  }, []);
  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilter({ [name]: value });
  };
  const debounceFilter = useDebounce(filter, 500, true);
  const { mutate, isLoading: isDeleteLoading } = useMutation(
    trackerAPI.destroy,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_TRACKER, { ...debounceFilter }],
          (old) => old.filter((tracker) => tracker.id != response),
        );
        toast.success('Tracker delete successfully');
      },
      onError: ({ response: { data, status } }) => {
        if (status == API_CODES.INVALID_DATA) {
          Object.entries(data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        } else {
          toast.error(data.message);
        }
      },
    },
  );
  const { data, isLoading, isSuccess } = useQuery(
    [KEY_QUERIES.FETCH_TRACKER, { ...debounceFilter }],
    () => trackerAPI.all({ ...debounceFilter }),
  );
  const handleOpenEdit = useCallback((data) => {
    setSelectedTracker(data);
    setAction('edit');
  }, []);
  const handleDelete = (id) => {
    mutate(id);
  };
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Box>
            <Typography variant="h5">Trackers</Typography>
          </Box>
          <Box display={'flex'}>
            <Button
              onClick={() => {
                setAction('create');
                setSelectedTracker(null);
              }}
            >
              Create Tracker
            </Button>
            <Box ml={2}>
              <TextField
                variant="outlined"
                placeholder="Search..."
                onChange={handleChangeFilter}
                value={filter.keyword}
                name="keyword"
                size="small"
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ marginY: 2 }} />
        {isSuccess && !!data.length && (
          <TablePagination
            component={'div'}
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
        <Box>
          {isLoading && <ListSkeleton />}
          {isSuccess && (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((tracker) => (
                    <TableRow key={tracker.id}>
                      <TableCell>{tracker.name}</TableCell>
                      <TableCell width={150}>
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
          )}
          {action && (
            <ModalTracker
              tracker={selectedTracker}
              action={action}
              handleClose={handleTrackerClose}
              keyQuery={debounceFilter}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default TrackerPage;
