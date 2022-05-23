import {
  Box,
  Button,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { memo, useCallback, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const defaultValues = {
  relative_issue_id: '',
};
const RelativeIssues = ({ relativeIssues, issueId }) => {
  const theme = useTheme();
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
  const { mutate, isLoading: isLinkIssueLoading } = useMutation(
    issueAPI.linkIssue,
    {
      onSuccess: (response) => {
        reset(defaultValues);
        setRelativeIssueOpen(false);
        queryClient.setQueryData([KEY_QUERIES.FETCH_ISSUE, issueId], (old) => ({
          ...old,
          ...response,
        }));
      },
      onError: ({ response }) => {
        if (response.status == API_CODES.INVALID_DATA) {
          Object.entries(response.data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        }
        toast.error(response.data.message);
      },
    },
  );
  const onSubmit = (data) => {
    mutate({ ...data, id: issueId, action: LINK_ISSUE_ACTION });
  };
  const handleToggleRelativeIssueOpen = useCallback(() => {
    setRelativeIssueOpen(!relativeIssueOpen);
    clearErrors();
  }, [relativeIssueOpen]);
  const handleUnLinkIssue = useCallback((relative_issue_id) => {
    mutate({ relative_issue_id, id: issueId, action: UNLINK_ISSUE_ACTION });
  }, []);
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
            <strong>Relative Issue</strong>
          </Typography>
          <Button size="small" onClick={handleToggleRelativeIssueOpen}>
            Add
          </Button>
        </Box>
        {!!relativeIssues?.length && (
          <TableContainer>
            <Table>
              <TableBody>
                {relativeIssues.map((relativeIssue) => (
                  <TableRow key={relativeIssue.id}>
                    <TableCell size="small" width={'64%'}>
                      <Typography component={Box} variant="body2">
                        Relative to
                        <Typography display={'inline'} variant="body2">
                          <Link
                            to="#"
                            style={
                              relativeIssue.issue.status == ISSUE_STATUS_CLOSED
                                ? {
                                    textDecoration: 'line-through',
                                    color: theme.palette.text.secondary,
                                  }
                                : { color: theme.palette.text.primary }
                            }
                          >{` ${relativeIssue.issue.tracker.name} #${relativeIssue.issue.id}`}</Link>
                        </Typography>
                        <Typography display={'inline'} variant="body2">
                          {`: ${relativeIssue.issue.name}`}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell size="small">
                      {ISSUE_STATUS[relativeIssue.issue.status]}
                    </TableCell>
                    <TableCell size="small">
                      {relativeIssue.issue.start_date}
                    </TableCell>
                    <TableCell size="small">
                      {relativeIssue.issue.end_date}
                    </TableCell>
                    <TableCell size="small" align="center" width={50}>
                      <IconButton
                        onClick={() =>
                          handleUnLinkIssue(relativeIssue.issue.id)
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
                  size="small"
                  label="Relative Issue ID"
                  errors={errors}
                />
                <Box ml={1}>
                  <Button
                    size="small"
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

export default memo(RelativeIssues);
