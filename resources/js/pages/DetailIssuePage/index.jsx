import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { KEY_QUERIES } from '../../config/keyQueries';
import issueAPI from '../../services/issue';
import { ISSUE_PRIORITIES, ISSUE_STATUS } from '../../config/constants';
import HeaderDetailIssuePage from './HeaderDetailIssuePage';
import ModalIssue from './ModalIssue';
import { useTheme } from '@emotion/react';
import { diffForHumans } from '../../utils/common';

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
    return <Typography>Loading</Typography>;
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
                  Add By <Box ml={0.5}>{data.author.name}</Box>
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
                        <InfoItem label="% Done" value={data.percent_done} />
                      </Stack>
                    </Box>
                  </Box>
                  <Box>
                    <Divider />
                    <Box py={2}>
                      <Typography gutterBottom>Description</Typography>
                      <Box>{data.description}</Box>
                    </Box>
                  </Box>
                  <Box>
                    <Divider />
                    <Box py={2}>
                      <Typography gutterBottom>Sub Issue</Typography>
                      {data?.subIssues?.length && (
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Ahiih</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Divider />
                    <Box py={2}>
                      <Typography gutterBottom>Relative Issue</Typography>
                      {data?.relativeIssues?.length && (
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Ahiih</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      )}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Stack>
          <Box>
            <Box py={1} position="sticky" top={0} zIndex={99} bgcolor={'white'}>
              <Typography variant="h6">History</Typography>
            </Box>
            <Divider />
            <Box pt={1.5}>
              <Stack spacing={1.5} divider={<Divider />}>
                {data?.histories?.map((history) => (
                  <Box key={history.id}>
                    <Box
                      display={'flex'}
                      alignItems="flex-start"
                      justifyContent={'flex-start'}
                    >
                      <Avatar sx={{ width: 28, height: 28, mr: 1 }} />
                      <Box>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component={Box}
                          fontWeight="bold"
                        >
                          <Typography
                            variant="subtitle2"
                            display={'inline'}
                            fontWeight="bold"
                            mr={0.5}
                          >
                            Updated by
                          </Typography>
                          <Typography display={'inline'} variant="subtitle2">
                            <Link
                              href="#"
                              underline="hover"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {`${history.updated_user.name} about `}
                            </Link>
                          </Typography>
                          <Typography display={'inline'} variant="subtitle2">
                            <Link
                              href="#"
                              underline="hover"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {diffForHumans(
                                new Date(),
                                new Date(history.created_at),
                              ) === 0
                                ? 'just now'
                                : `${diffForHumans(
                                    new Date(),
                                    new Date(history.created_at),
                                  )}`}
                            </Link>
                          </Typography>
                          <Typography
                            sx={{ ml: 0.5 }}
                            display={'inline'}
                            variant="subtitle2"
                          >
                            ago
                          </Typography>
                        </Typography>
                        <ul>
                          <Stack spacing={1}>
                            {history.detail_histories.map((detail) => (
                              <li key={detail.id}>
                                <Typography component={Box}>
                                  <Typography
                                    fontWeight={'bold'}
                                    textTransform="capitalize"
                                    display={'inline'}
                                    variant="body2"
                                    color={theme.palette.text.secondary}
                                  >
                                    {detail.key}
                                  </Typography>
                                  <Typography
                                    display={'inline'}
                                    variant="body2"
                                    marginLeft={0.5}
                                    color={theme.palette.text.secondary}
                                  >
                                    changed from
                                  </Typography>
                                  <Typography
                                    fontStyle={'italic'}
                                    display={'inline'}
                                    variant="body2"
                                    marginLeft={0.5}
                                    color={theme.palette.text.secondary}
                                  >
                                    {detail.old_value}
                                  </Typography>
                                  <Typography
                                    display={'inline'}
                                    variant="body2"
                                    marginLeft={0.5}
                                    color={theme.palette.text.secondary}
                                  >
                                    to
                                  </Typography>
                                  <Typography
                                    fontStyle={'italic'}
                                    display={'inline'}
                                    variant="body2"
                                    color={theme.palette.text.secondary}
                                    marginLeft={0.5}
                                  >
                                    {detail.new_value}
                                  </Typography>
                                </Typography>
                              </li>
                            ))}
                          </Stack>
                        </ul>
                      </Box>
                    </Box>
                    {data.note && <Typography>{data.note}</Typography>}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      {!!editIssueId && (
        <ModalIssue handleClose={handleCloseIssue} issueId={editIssueId} />
      )}
    </Container>
  );
};
export default DetailIssuePage;
