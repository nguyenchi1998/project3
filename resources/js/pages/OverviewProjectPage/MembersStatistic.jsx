import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from './../../services/project';
import { useQuery } from 'react-query';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { PROJECT_MEMBER_ROLES } from '../../config/constants';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProjectContext } from '../../layouts/project';
import { PATH, PROJECT_PATH } from '../../routes/paths';

const MembersStatistic = () => {
  const projectId = useContext(ProjectContext);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId, { groupByRole: true }],
    () => projectAPI.getMembers({ projectId, groupByRole: true }),
  );
  if (isLoading) {
    return (
      <Box>
        <Skeleton height={200} variant="rectangular" />
      </Box>
    );
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <>
      <Box py={1}>
        <Typography variant="h5">Members</Typography>
      </Box>
      <Paper variant="outlined">
        <Box px={2}>
          <Stack>
            {PROJECT_MEMBER_ROLES.map(({ label, value }) => (
              <Box
                key={value}
                display="flex"
                justifyContent="flex-start"
                justifyItems="center"
                py={1}
              >
                <Box mr={0.5}>{`${label}:`}</Box>
                {data[value] && (
                  <Box display="inline-block">
                    {data[value].map(({ name, id }, index) => (
                      <Box display="inline-flex" key={name}>
                        <Link
                          component={NavLink}
                          underline="hover"
                          to={`${PATH.PROJECT_PAGE}/${projectId}/${PROJECT_PATH.MEMBER}/${id}`}
                        >
                          {name}
                        </Link>
                        {index < data[value].length - 1 && (
                          <Box mr={0.5}>{`,`}</Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default MembersStatistic;
