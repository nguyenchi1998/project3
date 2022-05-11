import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ListSkeleton = () => {
  return (
    <Box sx={{ minWidth: 1050 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Members Size</TableCell>
            <TableCell>Languages</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5).keys()].map((i) => (
            <TableRow key={i}>
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
    </Box>
  );
};

export default ListSkeleton;
