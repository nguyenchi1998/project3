import React, {useCallback, useState} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {KEY_QUERIES} from 'config/keyQueries';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import managerAPI from 'services/manager';
import TableContainer from '@mui/material/TableContainer';
import {useQuery} from 'react-query';
import ListSkeleton from 'pages/Manager/ManagerPage/ListSkeleton';
import ManagerForm from 'pages/Manager/ManagerPage/ManagerForm';
import {EDIT_ACTION} from 'config/constants';

const ListResult = ({action, setAction}) => {
  const [selectedManager, setSelectedManager] = useState(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const {data, isLoading, isError, error} = useQuery(
    [KEY_QUERIES.FETCH_MANAGER],
    managerAPI.all,
    {
      refetchOnWindowFocus: false,
    },
  );
  const managerPaginate = useCallback(() => {
    return data.slice(page * limit, (page + 1) * limit);
  }, [page, data, limit]);
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <ListSkeleton/>;
  }
  const handleLimitChange = ({target: {value}}) => {
    setLimit(value);
  };
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
  const handleDelete = () => {
  };
  const handleEdit = (manager) => {
    setSelectedManager(manager);
    setAction(EDIT_ACTION);
  };

  const handleCloseForm = () => {
    setSelectedManager(null);
    setAction(null);
  };

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{minWidth: 1050}}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {managerPaginate().map((manager) => (
                    <TableRow hover key={manager.uuid}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Typography color="textPrimary" variant="body1">
                            {manager.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{manager.email}</TableCell>
                      <TableCell>{manager.birthday}</TableCell>
                      <TableCell>{manager.address}</TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          width={80}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(manager)}
                          >
                            <EditIcon/>
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(manager.uuid)}
                          >
                            <DeleteIcon/>
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={data.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <ManagerForm
        manager={selectedManager}
        action={action}
        handleCloseForm={handleCloseForm}
      />
    </>
  );
};
export default ListResult;
