import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import roleAPI from '../../services/role';
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

const headers = ['Name', 'Permission', 'Action'];

const ListRole = ({ handleOpenEdit }) => {
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_ROLE],
    () => roleAPI.all(),
  );
  if (isLoading) {
    return <TableSkeleton headers={headers} />;
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }
  return (
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
          {data.map((role) => (
            <TableRow key={role.id}>
              <TableCell width={160}>
                <Typography textTransform={'capitalize'}>
                  {role.name.replace('-', ' ')}
                </Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: 200 }}>
                <Typography noWrap>
                  {role.permissions
                    .map((permission) => permission.name)
                    .join(', ')}
                </Typography>
              </TableCell>
              <TableCell width={100}>
                <Box display="flex">
                  <IconButton onClick={() => handleOpenEdit(role)}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ListRole;
