import { useTheme } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import employeeAPI from '../../../services/employee';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import NoData from '../../../container/NoData';
import { PATH, PROJECT_PATH } from '../../../routes/paths';

const ProjectTab = ({ memberId }) => {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_MEMBER_PROJECT, memberId],
    () => employeeAPI.getProjects(memberId),
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
  if (!data.length) {
    return <NoData />;
  }
  return (
    <Box>
      {data.map((project) => (
        <Typography key={project.id}>
          <Link
            underline="hover"
            component={NavLink}
            to={`${PATH.PROJECT_PAGE}/${project.id}/${PROJECT_PATH.OVERVIEW}`}
          >
            {project.name}
          </Link>
        </Typography>
      ))}
    </Box>
  );
};
export default ProjectTab;
