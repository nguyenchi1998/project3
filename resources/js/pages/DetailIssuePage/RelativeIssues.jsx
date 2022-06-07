import {
  Box,
  Button,
  colors,
  Divider,
  IconButton,
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
import { useMutation, useQueryClient } from 'react-query';
import issueAPI from '../../services/issue';
import {
  ISSUE_STATUS,
  ISSUE_STATUS_CLOSED,
  LINK_ISSUE_ACTION,
  UNLINK_ISSUE_ACTION,
} from '../../config/constants';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { useForm } from 'react-hook-form';
import FormTextField from '../../components/FormTextField';
import * as API_CODES from '../../config/API_CODES';
import { KEY_QUERIES } from '../../config/keyQueries';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import { ProjectContext } from '../../layouts/project';

const defaultValues = {
  relative_issue_id: '',
};
const RelativeIssues = ({ relativeIssues, issueId }) => {
  const projectId = useContext(ProjectContext);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues,
  });
  const [relativeIssueOpen, setRelativeIssueOpen] = useState(false);

  const onSubmit = (data) => {
    mutate({ ...data, id: issueId, action: LINK_ISSUE_ACTION });
  };
  const handleToggleRelativeIssueOpen = useCallback(() => {
    setRelativeIssueOpen(!relativeIssueOpen);
    clearErrors();
  }, [relativeIssueOpen]);
  const handleUnLinkRelativeIssue = useCallback((relative_issue_id) => {
    mutate({ relative_issue_id, id: issueId, action: UNLINK_ISSUE_ACTION });
  }, []);
  const { mutate, isLoading: isLinkIssueLoading } = useMutation(
    issueAPI.toggleLinkRelativeIssue,
    {
      onSuccess: (response) => {
        queryClient.setQueryData([KEY_QUERIES.FETCH_ISSUE, issueId], (old) => ({
          ...old,
          ...response,
        }));
        handleToggleRelativeIssueOpen();
        reset(defaultValues);
        setRelativeIssueOpen(false);
        toast.success('Toggle relative issue successfully');
      },
      onError: ({ response: { data, status } }) => {
        if (status == API_CODES.INVALID_DATA) {
          Object.entries(data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        } else {
          handleToggleRelativeIssueOpen();
          reset(defaultValues);
          toast.error(data.message);
        }
      },
    },
  );

  return (
    <Box>
      <Divider />
      <Box py={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography component={Box} flexGrow={1} gutterBottom variant="body1">
            <strong>Relative Issue</strong>
          </Typography>
          <Button onClick={handleToggleRelativeIssueOpen}>Add</Button>
        </Box>
        {!!relativeIssues?.length && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell size="small">Subject</TableCell>
                  <TableCell size="small">Status</TableCell>
                  <TableCell size="small">Start Date</TableCell>
                  <TableCell size="small">Due Date</TableCell>
                  <TableCell size="small" />
                </TableRow>
              </TableHead>
              <TableBody>
                {relativeIssues.map((relativeIssue) => (
                  <TableRow key={relativeIssue.id}>
                    <TableCell size="small" width="64%">
                      <Typography component={Box} variant="body2">
                        Related to -
                        <Typography display="inline" variant="body2">
                          <Link
                            color={
                              ISSUE_STATUS_CLOSED.includes(
                                relativeIssue.issue.id,
                              )
                                ? 'gray'
                                : 'black'
                            }
                            underline={
                              ISSUE_STATUS_CLOSED.includes(
                                relativeIssue.issue.status,
                              )
                                ? 'none'
                                : 'hover'
                            }
                            component={NavLink}
                            to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${relativeIssue.issue.id}`}
                            sx={{
                              color: colors.grey,
                              textDecoration: ISSUE_STATUS_CLOSED.includes(
                                relativeIssue.issue.status,
                              )
                                ? 'line-through'
                                : 'none',
                            }}
                          >
                            {` ${relativeIssue.issue.tracker.name} #${relativeIssue.issue.id}`}
                          </Link>
                        </Typography>
                        <Typography display="inline" variant="body2">
                          {`: ${relativeIssue.issue.name}`}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell size="small">
                      {
                        ISSUE_STATUS.find(
                          ({ value }) => value === relativeIssue.issue.status,
                        ).key
                      }
                    </TableCell>
                    <TableCell size="small">
                      {relativeIssue.issue.start_date}
                    </TableCell>
                    <TableCell size="small">
                      {relativeIssue.issue.due_date}
                    </TableCell>
                    <TableCell size="small" align="center" width={50}>
                      <IconButton
                        onClick={() =>
                          handleUnLinkRelativeIssue(relativeIssue.issue.id)
                        }
                      >
                        <LinkOffIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {relativeIssueOpen && (
          <Box pt={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" justifyContent="flex-start">
                <FormTextField
                  control={control}
                  name="relative_issue_id"
                  label="Relative Issue ID"
                  errors={errors}
                  size="small"
                />
                <Box ml={1}>
                  <Button
                    sx={{ height: 40 }}
                    variant="outlined"
                    disabled={isLinkIssueLoading}
                    type="submit"
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RelativeIssues;
