import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import { ISSUE_STATUS, ISSUE_STATUS_CLOSED } from '../../config/constants';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

const SubIssues = ({ subIssues }) => {
  const theme = useTheme();
  return (
    <Box>
      <Divider />
      <Box py={2}>
        <Box
          display="flex"
          alignItems={'center'}
          justifyContent="space-between"
        >
          <Typography component={Box} flexGrow={1} gutterBottom variant="body1">
            <strong>Sub Issue</strong>
          </Typography>
          <Button size="small">Add</Button>
        </Box>
        {!!subIssues?.length && (
          <TableContainer>
            <Table>
              <TableBody>
                {subIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell size="small">
                      <Typography component={Box} variant="body2">
                        <Typography display={'inline'} variant="body2">
                          <Link
                            to="#"
                            style={
                              issue.status == ISSUE_STATUS_CLOSED
                                ? {
                                    textDecoration: 'line-through',
                                    color: theme.palette.text.secondary,
                                  }
                                : { color: theme.palette.text.primary }
                            }
                          >{` ${issue.tracker.name} #${issue.id}`}</Link>
                        </Typography>
                        <Typography display={'inline'} variant="body2">
                          {`: ${issue.name}`}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell size="small" width={150}>
                      {ISSUE_STATUS[issue.status]}
                    </TableCell>
                    <TableCell size="small" width={130}>
                      {issue.start_date}
                    </TableCell>
                    <TableCell size="small" width={130}>
                      {issue.end_date}
                    </TableCell>
                    <TableCell size="small" width={200}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={issue.progress_percent}
                            sx={{ height: 20 }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >{`${Math.round(
                            issue.progress_percent,
                          )}%`}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default memo(SubIssues);
