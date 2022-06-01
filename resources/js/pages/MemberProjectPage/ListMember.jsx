import { useMutation, useQuery, useQueryClient } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import { useCallback, useContext, useState } from 'react';
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
import { format } from 'date-fns';
import { PROJECT_MEMBER_ROLES } from '../../config/constants';
import ConfirmDialog from '../../components/ConfirmDialog';
import { ProjectContext } from '../../layouts/project';

const headers = ['Name', 'Role', 'Email', 'Effort', 'Join Date', 'Action'];

const ListMember = ({ debounceFilter, handleOpenEdit }) => {
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
  const handleConfirmDeleteMember = useCallback((memberId) => {
    setDeleteId(memberId);
  }, []);
  const handleCloseConfirmDeleteMember = useCallback(() => {
    setDeleteId(null);
  }, []);
  const { mutate: deleteMutate, isLoading: isDestroyPending } = useMutation(
    projectAPI.deleteMember,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId, { ...debounceFilter }],
          () => response,
        );
        toast.success('Member deleted successfully');
      },
      onError: ({ response: { data } }) => {
        toast.error(data.message);
      },
      onSettled: () => {
        handleCloseConfirmDeleteMember();
      },
    },
  );
  const handleRemoveMember = () => {
    deleteMutate({ projectId, memberId: deleteId });
  };
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId, { ...debounceFilter }],
    () => projectAPI.getMembers({ projectId, ...debounceFilter }),
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
                {data.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>
                      {PROJECT_MEMBER_ROLES[member?.pivot?.role]}
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{`${member?.pivot?.effort}%`}</TableCell>
                    <TableCell>
                      {format(
                        new Date(member?.pivot?.created_at),
                        'yyyy-MM-dd',
                      )}
                    </TableCell>
                    <TableCell width={100}>
                      <Box display="flex">
                        <IconButton onClick={() => handleOpenEdit(member)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={isDestroyPending}
                          onClick={() => handleConfirmDeleteMember(member.id)}
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
            onConfirm={handleRemoveMember}
            onCancel={handleCloseConfirmDeleteMember}
            message="Remove this member?"
          />
        </Box>
      ) : (
        <Typography>No data to display</Typography>
      )}
    </Box>
  );
};
export default ListMember;
