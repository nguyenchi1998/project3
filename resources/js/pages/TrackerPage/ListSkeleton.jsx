import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

const ListSkeleton = () => {
  return (
    <>
      <Box display={'flex'} justifyContent="flex-end">
        <Skeleton width={240} height="45px" />
      </Box>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5).keys()].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton height={45} />
                </TableCell>
                <TableCell width={150}>
                  <Skeleton height={45} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListSkeleton;
