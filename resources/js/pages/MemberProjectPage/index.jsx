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

const MemberProjectPage = ({ projectId }) => {
  const queryClient = useQueryClient();
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    keyword: '',
    ...params,
  });
  const [action, setAction] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
      onError: ({ response: { data, status } }) => {
        if (status == API_CODES.INVALID_DATA) {
          Object.entries(data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        }
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
  const handleRemoveMember = (memberId) => {
    deleteMutate({ projectId, memberId });
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
              variant="contained"
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
                size="small"
                placeholder="Search..."
                onChange={handleChangeFilter}
                value={filter.keyword}
                name="keyword"
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
                      <TableCell size="small">{member.name}</TableCell>
                      <TableCell size="small">
                        {PROJECT_MEMBER_ROLES[member?.pivot?.role]}
                      </TableCell>
                      <TableCell size="small">{member.email}</TableCell>
                      <TableCell size="small">
                        {member?.pivot?.effort}
                      </TableCell>
                      <TableCell size="small">
                        {format(
                          new Date(member?.pivot?.created_at),
                          'yyyy-MM-dd',
                        )}
                      </TableCell>
                      <TableCell width={150} size="small">
                        <Box display="flex">
                          <IconButton onClick={() => handleOpenEdit(member)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            disabled={isDestroyPending}
                            onClick={() => handleRemoveMember(member.id)}
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
        </Box>
      </Box>
    </Container>
  );
};
export default MemberProjectPage;
