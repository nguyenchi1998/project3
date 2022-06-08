import React from 'react';
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import ListHead from './ListHead';

const ListSkeleton = ({ columnCount, numberRow = 5 }) => {
  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table stickyHeader>
          <ListHead />
          <TableBody>
            {[...Array(numberRow).keys()].map((i) => (
              <TableRow key={i}>
                {[...Array(columnCount).keys()].map((i) => (
                  <TableCell key={i}>
                    <Skeleton height="45px" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListSkeleton;
