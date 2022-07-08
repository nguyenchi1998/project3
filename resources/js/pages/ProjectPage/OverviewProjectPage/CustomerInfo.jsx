import { Box, Paper, Skeleton, Stack, Typography, Link } from '@mui/material';
import { useContext } from 'react';
import { ProjectContext } from '../../../layouts/project';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import { NavLink } from 'react-router-dom';

const CustomerInfo = () => {
  const projectId = useContext(ProjectContext);
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, projectId],
    () => projectAPI.find(projectId),
  );

  if (isLoading) {
    return <Skeleton height={100} />;
  }

  if (isError) {
    return <Box>{error.message}</Box>;
  }
  return (
    <>
      <Box py={1}>
        <Typography variant="h5">Customer</Typography>
      </Box>
      <Paper variant="outlined">
        <Box px={2}>
          <Stack>
            <Box
              py={1}
              display="flex"
              justifyContent="flex-start"
              justifyItems="center"
            >
              <Box pr={0.5}>Name:</Box>
              <Link component={NavLink} underline="hover" to="#">
                {data?.customer?.name}
              </Link>
            </Box>
            <Box
              py={1}
              display="flex"
              justifyContent="flex-start"
              justifyItems="center"
            >
              <Box pr={0.5}>Country:</Box>
              <Link component={NavLink} underline="hover" to="#">
                {data?.customer?.country}
              </Link>
            </Box>
            <Box
              py={1}
              display="flex"
              justifyContent="flex-start"
              justifyItems="center"
            >
              <Box pr={0.5}>Name:</Box>
              <Link component={NavLink} underline="hover" to="#">
                {data?.customer?.url}
              </Link>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};
export default CustomerInfo;
