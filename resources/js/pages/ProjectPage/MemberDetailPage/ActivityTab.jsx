import { KEY_QUERIES } from '../../../config/keyQueries';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { ProjectContext } from '../../../layouts/project';
import projectAPI from '../../../services/project';
import { Box, Link, Stack, Typography, Skeleton } from '@mui/material';
import NoData from '../../../container/NoData';
import { format } from 'date-fns';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';
import { PATH, PROJECT_PATH } from '../../../routes/paths';

const ActivityTab = ({ memberId }) => {
  const theme = useTheme();
  const projectId = useContext(ProjectContext);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER_ACTIVITY, projectId, memberId],
    () => projectAPI.getMemberActivities({ projectId, memberId }),
  );
  if (isLoading) {
    return (
      <Box>
        <Skeleton height="24px" width="190px" />
        <Skeleton height="24px" width="240px" />
        <Skeleton height="24px" width="350px" />
      </Box>
    );
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }
  if (!Object.entries(data).length) {
    return <NoData />;
  }
  return (
    <Box>
      <Stack spacing={2}>
        {Object.entries(data).map((activity) => (
          <Box key={activity[0]}>
            <Box fontWeight="bold">{activity[0]}</Box>
            <Box ml={2} pt={1}>
              <Stack spacing={1}>
                {activity[1].map((history) => (
                  <Box key={history.id}>
                    <Typography component={Box}>
                      <Typography
                        display="inline"
                        variant="body2"
                        component={Box}
                        mr={0.5}
                      >
                        {format(new Date(history.created_at), 'HH:mm')}
                      </Typography>
                      <Typography display="inline" variant="body1">
                        <Link
                          component={NavLink}
                          to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.ISSUE}/${history.issue.id}`}
                          underline="hover"
                        >
                          {history.issue.name}
                        </Link>
                      </Typography>
                    </Typography>
                    <Box ml={4}>
                      {history.detail_histories.map((detail) => (
                        <Typography component={Box} noWrap>
                          <Typography
                            textTransform="capitalize"
                            display="inline"
                            variant="body2"
                            color={theme.palette.text.secondary}
                          >
                            {detail.key}
                          </Typography>
                          {detail.old_value !== null ? (
                            <>
                              <Typography
                                display="inline"
                                variant="body2"
                                marginLeft={0.5}
                                color={theme.palette.text.secondary}
                              >
                                changed from
                              </Typography>
                              <Typography
                                fontStyle="italic"
                                display="inline"
                                variant="body2"
                                marginLeft={0.5}
                                color={theme.palette.text.secondary}
                              >
                                {detail.old_value}
                              </Typography>
                              <Typography
                                display="inline"
                                variant="body2"
                                marginLeft={0.5}
                                color={theme.palette.text.secondary}
                              >
                                to
                              </Typography>
                            </>
                          ) : (
                            <Typography
                              display="inline"
                              variant="body2"
                              marginLeft={0.5}
                              color={theme.palette.text.secondary}
                            >
                              set to
                            </Typography>
                          )}

                          <Typography
                            fontStyle="italic"
                            display="inline"
                            variant="body2"
                            color={theme.palette.text.secondary}
                            marginLeft={0.5}
                          >
                            {detail.new_value}
                          </Typography>
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
export default ActivityTab;
