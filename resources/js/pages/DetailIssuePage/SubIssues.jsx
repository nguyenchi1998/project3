import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { ISSUE_STATUS, ISSUE_STATUS_CLOSED } from '../../config/constants';
import { useTheme } from '@emotion/react';
import ModalSubIssue from './ModalSubIssue';
import { useMutation, useQueryClient } from 'react-query';
import issueAPI from './../../services/issue';
import { KEY_QUERIES } from '../../config/keyQueries';
import { toast } from 'react-toastify';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../../layouts/project';

const SubIssues = ({ parentIssue }) => {
  const theme = useTheme();
  const projectId = useContext(ProjectContext);
  const queryClient = useQueryClient();
  const [subIssueOpen, setSubIssueOpen] = useState(false);
  const handleCloseSubIssue = useCallback(() => {
    setSubIssueOpen(false);
  }, []);
  const handleOpenSubIssue = useCallback(() => {
    setSubIssueOpen(true);
  }, []);
  const handleUnLinkSubIssue = useCallback((subIssueId) => {
    mutate({ subIssueId, id: parentIssue.id });
  }, []);
  const { mutate, isLoading } = useMutation(issueAPI.removeLinkSubIssue, {
    onSuccess: (response) => {
      queryClient.setQueryData(
        [KEY_QUERIES.FETCH_ISSUE, parentIssue.id],
        (old) => ({
          ...old,
          ...response,
        }),
      );
      toast.success('Remove sub issue successfully');
    },
    onError: ({ response: { data, status } }) => {
      if (status === API_CODES.INVALID_DATA) {
        Object.entries(data.errors).forEach((error) => {
          const [name, message] = error;
          setError(name, { type: 'custom', message: message[0] });
        });
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <Box>
      <Divider />
      <Box pt={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography component={Box} flexGrow={1} gutterBottom variant="body1">
            <strong>Sub Issue</strong>
          </Typography>
          <Button onClick={handleOpenSubIssue}>Add</Button>
        </Box>
        {!!parentIssue?.sub_issues?.length && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell size="small">Subject</TableCell>
                  <TableCell size="small">Status</TableCell>
                  <TableCell size="small">Assignee</TableCell>
                  <TableCell size="small">Percent Done</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parentIssue?.sub_issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell size="small" width={'64%'}>
                      <Typography component={Box} variant="body2">
                        <Typography display="inline" variant="body2">
                          <Link
                            color={
                              ISSUE_STATUS_CLOSED.includes(issue.status)
                                ? 'gray'
                                : 'black'
                            }
                            underline={
                              ISSUE_STATUS_CLOSED.includes(issue.status)
                                ? 'none'
                                : 'hover'
                            }
                            component={NavLink}
                            to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${issue.id}`}
                            sx={{
                              textDecoration: ISSUE_STATUS_CLOSED.includes(
                                issue.status,
                              )
                                ? 'line-through'
                                : 'none',
                            }}
                          >
                            {` ${issue.tracker.name} #${issue.id}`}
                          </Link>
                        </Typography>
                        <Typography display="inline" variant="body2">
                          {`: ${issue.name}`}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell size="small" width={150}>
                      {
                        ISSUE_STATUS.find(({ value }) => value === issue.status)
                          .key
                      }
                    </TableCell>
                    <TableCell size="small" width={130}>
                      {issue?.assignee?.name}
                    </TableCell>
                    <TableCell size="small" width={150}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={issue.progress_percent}
                            sx={{ height: 20 }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="text.secondary">
                            {`${Math.round(issue.progress_percent)}%`}
                          </Typography>
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
      {subIssueOpen && (
        <ModalSubIssue
          open={subIssueOpen}
          handleClose={handleCloseSubIssue}
          parentIssue={parentIssue}
        />
      )}
    </Box>
  );
};

export default SubIssues;
