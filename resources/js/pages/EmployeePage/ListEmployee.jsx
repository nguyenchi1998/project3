import { useMutation, useQuery, useQueryClient } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import userAPI from '../../services/user';
import { useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import TableSkeleton from '../../components/TableSkeleton';
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
import { format } from 'date-fns';
import { PROJECT_MEMBER_ROLES } from '../../config/constants';
import ConfirmDialog from '../../components/ConfirmDialog';
import { ProjectContext } from '../../layouts/project';
import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { PATH, PROJECT_PATH } from '../../routes/paths';

const headers = ['Name', 'Email', 'Role', 'Action'];

const ListEmployee = ({ debounceFilter, handleOpenEdit }) => {
  const projectId = useContext(ProjectContext);
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const handleConfirmDeleteEmployee = useCallback((employeeId) => {
    setDeleteId(employeeId);
  }, []);
  const handleCloseConfirmDeleteEmployee = useCallback(() => {
    setDeleteId(null);
  }, []);
  const { mutate: deleteMutate, isLoading: isDestroyPending } = useMutation(
    userAPI.destroy,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_EMPLOYEE, { ...debounceFilter }],
          () => response,
        );
        toast.success('Employee deleted successfully');
      },
      onError: ({ response: { data } }) => {
        toast.error(data.message);
      },
      onSettled: () => {
        handleCloseConfirmDeleteEmployee();
      },
    },
  );
  const handleRemoveEmployee = () => {
    deleteMutate(deleteId);
  };
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_EMPLOYEE, { ...debounceFilter }],
    () => userAPI.all({ ...debounceFilter }),
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
                {data.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Link
                        component={NavLink}
                        to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.MEMBER}/${employee.id}`}
                        underline="hover"
                      >
                        {employee.name}
                      </Link>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      {employee?.roles.map((role) => role.name).join(',')}
                    </TableCell>
                    <TableCell width={100}>
                      <Box display="flex">
                        <IconButton onClick={() => handleOpenEdit(employee)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={isDestroyPending}
                          onClick={() =>
                            handleConfirmDeleteEmployee(employee.id)
                          }
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

          <ConfirmDialog
            open={!!deleteId}
            onConfirm={handleRemoveEmployee}
            onCancel={handleCloseConfirmDeleteEmployee}
            message="Remove this employee?"
          />
        </Box>
      ) : (
        <Typography>No data to display</Typography>
      )}
    </Box>
  );
};
export default ListEmployee;
