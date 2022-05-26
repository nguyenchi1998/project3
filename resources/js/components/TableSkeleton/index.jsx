import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Skeleton,
} from '@mui/material';

const TableSkeleton = ({ numberRow, headers }) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(numberRow).keys()].map((i) => (
            <TableRow key={i}>
              {[...Array(headers.length).keys()].map((j) => (
                <TableCell key={j}>
                  <Skeleton height="45px" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
