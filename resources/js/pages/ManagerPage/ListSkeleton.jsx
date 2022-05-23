import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

const ListSkeleton = ({ number = 5 }) => {
  return (
    <TableContainer>
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
          {[...Array(number).keys()].map((i) => (
            <TableRow key={i}>
              <TableCell padding="checkbox">
                <Skeleton height="45px" />
              </TableCell>
              <TableCell>
                <Skeleton height="45px" />
              </TableCell>
              <TableCell>
                <Skeleton height="45px" />
              </TableCell>
              <TableCell>
                <Skeleton height="45px" />
              </TableCell>
              <TableCell>
                <Skeleton height="45px" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListSkeleton;
