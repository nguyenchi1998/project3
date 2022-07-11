import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import positionAPI from '../../services/position';
import TableSkeleton from '../../components/TableSkeleton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import EditIcon from '@mui/icons-material/Edit';
import { Link, TablePagination } from '@mui/material';
import { useState, useCallback } from 'react';
import { PATH } from '../../routes/paths';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

const headers = ['Name', 'Employees', 'Action'];

const ListPosition = ({ handleOpenEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_POSITION],
    () => positionAPI.all(),
  );
  if (isLoading) {
    return <TableSkeleton headers={headers} />;
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }
  return (
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
            {data
              .slice(rowsPerPage * page, (page + 1) * rowsPerPage)
              .map((position) => (
                <TableRow key={position.id}>
                  <TableCell>
                    <Typography textTransform={'capitalize'}>
                      {position.name.replace('-', ' ')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Link
                      component={NavLink}
                      to={`${PATH.EMPLOYEE_PAGE}?${queryString.stringify(
                        {
                          positionId: position.id,
                        },
                        { arrayFormat: 'index' },
                      )}`}
                      underline="hover"
                    >
                      {position.employees.length}
                    </Link>
                  </TableCell>
                  <TableCell width={100}>
                    <Box display="flex">
                      <IconButton onClick={() => handleOpenEdit(position)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ListPosition;
