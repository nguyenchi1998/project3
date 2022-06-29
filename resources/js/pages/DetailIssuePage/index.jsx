import {
  Box,
  Button,
  Container,
  Divider,
  LinearProgress,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import issueAPI from '../../services/issue';
import { ISSUE_PRIORITIES, ISSUE_STATUS } from '../../config/constants';
import HeaderDetailIssuePage from './HeaderDetailIssuePage';
import ModalEditIssue from './ModalEditIssue';
import IssueHistories from './IssueHistories';
import { NavLink } from 'react-router-dom';
import RelativeIssues from './RelativeIssues';
import SubIssues from './SubIssues';
import LoadingIndicator from './../../components/LoadingIndicator';
import useParamsInt from '../../hooks/useParamInt';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import { ProjectContext } from '../../layouts/project';

const InfoItem = ({ label, value }) => {
  return (
    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
      <Box
        sx={{ textTransform: 'capitalize', mr: 1, fontWeight: 'bold' }}
      >{`${label}:`}</Box>
      <Box>{value}</Box>
    </Box>
  );
};

const DetailIssuePage = () => {
  const projectId = useContext(ProjectContext);
  const [editIssueId, setIssueId] = useState(null);
  const issueId = useParamsInt('issueId');
  const handleCloseIssue = useCallback(() => {
    setIssueId(null);
  }, []);
  const handleOpenIssue = useCallback(() => {
    setIssueId(issueId);
  }, []);

  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_ISSUE, issueId],
    () => issueAPI.find(issueId),
  );
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return (
      <Box
        width={'100%'}
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems={'flex-start'}
      >
        <LoadingIndicator />
      </Box>
    );
  }
  return (
    <Container maxWidth={false}>
      <Box py={2} pb={6}>
        <Box pb={1}>
          <Typography variant="h5">{`${data?.tracker?.name} #${data.id}`}</Typography>
        </Box>
        <Box>
          <Stack spacing={2}>
            <HeaderDetailIssuePage issue={data} />
            <Paper variant="outlined">
              <Box p={2} py={1}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems={'center'}
                >
                  <Box flexGrow={1}>
                    <Typography variant="h5">{`${data.name}`}</Typography>
                  </Box>
                  <Button variant="outlined" onClick={handleOpenIssue}>
                    Edit
                  </Button>
                </Box>
                <Stack spacing={1}>
                  <Box mt={1} display="flex">
                    <Box flexGrow={1}>
                      <Stack spacing={0.5}>
                        <InfoItem
                          label="status"
                          value={
                            ISSUE_STATUS.find(
                              ({ value }) => value === data.status,
                            ).label
                          }
                        />
                        <InfoItem
                          label="priority"
                          value={
                            ISSUE_PRIORITIES.find(
                              ({ value }) => value === data.priority,
                            ).label
                          }
                        />
                        <InfoItem
                          label="author"
                          value={
                            <Link
                              underline="hover"
                              component={NavLink}
                              to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.MEMBER}/${data?.author?.id}`}
                            >
                              {data?.author?.name}
                            </Link>
                          }
                        />
                        <InfoItem
                          label="assignee"
                          value={
                            <Link href="#" underline="hover">
                              {data?.assignee?.name}
                            </Link>
                          }
                        />
                        <InfoItem
                          label="Estimate time"
                          value={`${data?.estimate_time}h`}
                        />
                      </Stack>
                    </Box>
                    <Box flexGrow={1}>
                      <Stack spacing={0.5}>
                        <InfoItem label="start date" value={data.start_date} />
                        <InfoItem label="due date" value={data.due_date} />
                        <InfoItem
                          label="% Done"
                          value={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ width: 100, mr: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={data.progress_percent}
                                  sx={{ height: 20 }}
                                />
                              </Box>
                              <Box sx={{ minWidth: 35 }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {`${Math.round(data.progress_percent)}%`}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                        <InfoItem
                          label="Target Version"
                          value={
                            <Link underline="hover" to="#" component={NavLink}>
                              {data?.target_version?.name}
                            </Link>
                          }
                        />
                      </Stack>
                    </Box>
                  </Box>
                  <Box>
                    <Divider />
                    <Box py={2}>
                      <Typography gutterBottom variant="body1">
                        <strong>Description</strong>
                      </Typography>
                      <Box>{data.description}</Box>
                    </Box>
                  </Box>
                  <SubIssues parentIssue={data} />
                  <RelativeIssues
                    relativeIssues={data?.relative_issues}
                    issueId={issueId}
                  />
                </Stack>
              </Box>
            </Paper>
          </Stack>
          <IssueHistories histories={data.histories} />
        </Box>
      </Box>
      {!!editIssueId && (
        <ModalEditIssue handleClose={handleCloseIssue} issueId={editIssueId} />
      )}
    </Container>
  );
};
export default DetailIssuePage;
