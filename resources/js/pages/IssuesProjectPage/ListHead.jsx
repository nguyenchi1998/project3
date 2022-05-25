import { TableCell, TableHead, TableRow } from '@mui/material';

const ListHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Issue</TableCell>
        <TableCell>Tracker</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Priority</TableCell>
        <TableCell>Author</TableCell>
        <TableCell>Assignee</TableCell>
        <TableCell>Updated</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ListHead;
