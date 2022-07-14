import { useMutation, useQuery, useQueryClient } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import { useCallback, useContext, useState } from 'react';
import targetVersionAPI from '../../../services/targetVersion';
import { toast } from 'react-toastify';
import TableSkeleton from '../../../components/TableSkeleton';
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
import NoData from '../../../components/NoData';
import { DATE_FORMAT, TARGET_VERSION_STATUS } from '../../../config/constants';
import { ProjectContext } from '../../../layouts/project';
import { format } from 'date-fns';

const headers = ['Name', 'Start Date', 'Due Date', 'Status', 'Action'];

const ListTargetVersion = ({ debounceFilter, handleOpenEdit }) => {
  const projectId = useContext(ProjectContext);
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
    targetVersionAPI.destroy,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_TARGET_VERSION, projectId, { ...debounceFilter }],
          (old) => old.filter((targetVersion) => targetVersion.id !== response),
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
    () => projectAPI.getTargetVersions({ projectId, ...debounceFilter }),
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
                {data.map((targetVersion) => (
                  <TableRow key={targetVersion.id}>
                    <TableCell>{targetVersion.name}</TableCell>
                    <TableCell>
                      {targetVersion.start_date
                        ? format(
                            new Date(targetVersion.start_date),
                            DATE_FORMAT,
                          )
                        : null}
                    </TableCell>
                    <TableCell>
                      {targetVersion.due_date
                        ? format(new Date(targetVersion.due_date), DATE_FORMAT)
                        : null}
                    </TableCell>
                    <TableCell>
                      {
                        TARGET_VERSION_STATUS.find(
                          ({ value }) => value === targetVersion.status,
                        ).label
                      }
                    </TableCell>
                    <TableCell width={100}>
                      <Box display="flex">
                        <IconButton
                          onClick={() => handleOpenEdit(targetVersion)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={isDeleteLoading}
                          onClick={() => handleDelete(targetVersion.id)}
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
        <NoData />
      )}
    </Box>
  );
};
export default ListTargetVersion;
