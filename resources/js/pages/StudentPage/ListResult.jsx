import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { KEY_QUERIES } from 'config/keyQueries';
import studentAPI from 'services/student';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import StudentForm from 'pages/Manager/StudentPage/StudentForm';
import ListSkeleton from 'pages/Manager/StudentPage/ListSkeleton';
import { Avatar } from '@mui/material';
import { EDIT_ACTION } from 'config/constants';
import DeleteConfirmModal from 'components/ConfirmDialog';
import { toast } from 'react-toastify';

const ListResult = ({ action, setAction, keyword }) => {
  const queryClient = useQueryClient();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const { mutate } = useMutation(studentAPI.destroy);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_STUDENT, keyword],
    () => studentAPI.all(keyword),
    {
      refetchOnWindowFocus: false,
    },
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <ListSkeleton />;
  }

  const renderData = () => {
    return (
      data
        .filter((e) => e?.name?.toLowerCase()?.includes(keyword?.toLowerCase()))
        .slice(page * limit, page * limit + limit) ?? []
    );
  };

  const handleLimitChange = ({ target: { value } }) => {
    setLimit(value);
    setPage(0);
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
  const handleConfirmDelete = (student) => {
    setOpenDelete(true);
    setSelectedStudent(student);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedStudent(null);
  };
  const handleDelete = () => {
    mutate(selectedStudent.uuid, {
      onSuccess: () => {
        queryClient.invalidateQueries([KEY_QUERIES.FETCH_STUDENT, keyword]);
        handleCloseDelete();
        toast('Create student successfully');
      },
      onError: () => {
        toast('Create student fail');
      },
    });
    handleCloseDelete();
  };
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setAction(EDIT_ACTION);
  };
  const handleCloseForm = () => {
    setSelectedStudent(null);
    setAction(null);
  };

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderData().map((student) => (
                  <TableRow hover key={student.uuid}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Avatar />
                        <Box ml={1}>{student.name}</Box>
                      </Box>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>

                    <TableCell>{student.class_room?.name}</TableCell>
                    <TableCell>
                      {student.class_room?.specialization?.name}
                    </TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width={80}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(student)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleConfirmDelete(student)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
      <StudentForm
        student={selectedStudent}
        action={action}
        handleCloseForm={handleCloseForm}
        keyword={keyword}
      />
      <DeleteConfirmModal
        student={selectedStudent}
        open={openDelete}
        onConfirm={handleDelete}
        onCancel={handleCloseDelete}
      />
    </>
  );
};
export default ListResult;
