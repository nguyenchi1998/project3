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
import ListSkeleton from './ListSkeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDebounce from '../../hooks/useDebounce';
import useQueryParam from '../../hooks/useQueryParam';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import { PROJECT_MEMBER_ROLES } from '../../config/constants';
import ListHeader from './ListHeader';
import { format } from 'date-fns';
import ModalMemberProject from './ModalMemberProject';
import { toast } from 'react-toastify';
import ConfirmDialog from './../../components/ConfirmDialog';

const MemberProjectPage = ({ projectId }) => {
  const queryClient = useQueryClient();
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    keyword: '',
    ...params,
  });
  const [deleteId, setDeleteId] = useState(null);
  const [action, setAction] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleConfirmDeleteMember = useCallback((memberId) => {
    setDeleteId(memberId);
  }, []);
  const handleCloseConfirmDeleteMember = useCallback(() => {
    setDeleteId(null);
  }, []);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const handleMemberClose = useCallback(() => {
    setSelectedMember(null);
    setAction(null);
  }, []);
  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilter({ [name]: value });
  };
  const debounceFilter = useDebounce(filter, 500, true);
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
  const { data, isLoading, isSuccess } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId, { ...debounceFilter }],
    () => projectAPI.getMembers({ projectId, ...debounceFilter }),
  );
  const handleOpenEdit = useCallback((data) => {
    setSelectedMember(data);
    setAction('edit');
  }, []);

  const handleRemoveMember = () => {
    deleteMutate({ projectId, memberId: deleteId });
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
            <Typography variant="h5">Members</Typography>
          </Box>
          <Box display={'flex'}>
            <Button
              onClick={() => {
                setAction('create');
                setSelectedMember(null);
              }}
            >
              Add Member
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
                <ListHeader />
                <TableBody>
                  {data.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>
                        {PROJECT_MEMBER_ROLES[member?.pivot?.role]}
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member?.pivot?.effort}</TableCell>
                      <TableCell>
                        {format(
                          new Date(member?.pivot?.created_at),
                          'yyyy-MM-dd',
                        )}
                      </TableCell>
                      <TableCell width={150}>
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
          )}
          {!!action && (
            <ModalMemberProject
              member={selectedMember}
              handleClose={handleMemberClose}
              keyQuery={debounceFilter}
              projectId={projectId}
              action={action}
              members={data ?? []}
            />
          )}
          <ConfirmDialog
            open={!!deleteId}
            onConfirm={handleRemoveMember}
            onCancel={handleCloseConfirmDeleteMember}
            message="Remove this member?"
          />
        </Box>
      </Box>
    </Container>
  );
};
export default MemberProjectPage;
