import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { KEY_QUERIES } from '../../config/keyQueries';
import issueAPI from '../../services/issue';
import { ISSUE_PRIORITIES, ISSUE_STATUS } from '../../config/constants';
import HeaderDetailIssuePage from './HeaderDetailIssuePage';
import ModalEditIssue from './ModalEditIssue';
import { useTheme } from '@emotion/react';
import IssueHistories from './IssueHistories';
import RelativeIssues from './RelativeIssues';
import SubIssues from './SubIssues';
import LoadingIndicator from './../../components/LoadingIndicator';
import ModalSubIssue from './ModalSubIssue';

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
  const theme = useTheme();
  const [editIssueId, setIssueId] = useState(null);
  const { issueId } = useParams();
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
                  display={'flex'}
                  justifyContent="space-between"
                  alignItems={'center'}
                >
                  <Box flexGrow={1}>
                    <Typography variant="h6">{`${data.name}`}</Typography>
                  </Box>
                  <Button variant="outlined" onClick={handleOpenIssue}>
                    Edit
                  </Button>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent="flex-start"
                  alignItems={'center'}
                  fontSize={14}
                >
                  Add By <Box ml={0.5}>{data?.author?.name}</Box>
                </Box>
                <Stack spacing={1}>
                  <Box mt={1} display="flex">
                    <Box flexGrow={1}>
                      <Stack spacing={0.5}>
                        <InfoItem
                          label="status"
                          value={ISSUE_STATUS[data.status]}
                        />
                        <InfoItem
                          label="priority"
                          value={ISSUE_PRIORITIES[data.priority]}
                        />
                        <InfoItem
                          label="assignee"
                          value={
                            <Link href="#" underline="hover">
                              <Box color={theme.palette.text.primary}>
                                {data?.assignee?.name}
                              </Box>
                            </Link>
                          }
                        />
                        <InfoItem
                          label="target version"
                          value={
                            <Link href="#">{data?.targetVersion?.name}</Link>
                          }
                        />
                      </Stack>
                    </Box>
                    <Box flexGrow={1}>
                      <Stack spacing={0.5}>
                        <InfoItem label="start date" value={data.start_date} />
                        <InfoItem label="end date" value={data.end_date} />
                        <InfoItem
                          label="% Done"
                          value={`${data.progress_percent} %`}
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
                  <SubIssues issue={data} />
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
