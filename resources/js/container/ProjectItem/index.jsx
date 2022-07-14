import Box from '@mui/material/Box';
import { PROJECT_TYPES } from '../../config/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { BsCalendarCheck, BsHddStack, BsPeopleFill } from 'react-icons/bs';
import { SiJavascript } from 'react-icons/si';
import { MdOutlineCalendarToday } from 'react-icons/md';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  LinearProgress,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import { NavLink } from 'react-router-dom';
import projectAPI from './../../services/project';
import { useMutation, useQueryClient } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';

const ProjectItem = ({ project }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(projectAPI.destroy, {
    onSuccess: () => {
      toast.success('Project delete successfully');
      queryClient.setQueryData([KEY_QUERIES.FETCH_PROJECT], (old) =>
        old.filter(({ id }) => project.id !== id),
      );
    },
    onError: ({ response: { data } }) => {
      toast.error(data.message);
    },
  });
  const handleDelete = () => {
    mutate(project.id);
  };
  return (
    <Paper variant="outlined" sx={{ height: '100%' }}>
      <Box position="relative">
        <Box
          top={-16}
          position="absolute"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={1}
        >
          <Avatar
            component={NavLink}
            to={`${PATH.PROJECT_PAGE}/${project.id}/${PROJECT_PATH.OVERVIEW}`}
            sx={{ bgcolor: deepOrange[500], height: 50, width: 50 }}
            variant="square"
          >
            {project.name.charAt(0)}
          </Avatar>
          <Link
            component={NavLink}
            to={`${PATH.PROJECT_PAGE}/${project.id}/${PROJECT_PATH.OVERVIEW}`}
            underline="hover"
            sx={{ width: '100%' }}
          >
            <Typography variant="h6" noWrap={true} textAlign="center">
              {project.name}
            </Typography>
          </Link>
        </Box>
        <Stack spacing={1.5} p={2}>
          <Box
            mt={7}
            display="flex"
            width="100%"
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              sx={{ p: 'unset', px: 1, py: 0.3 }}
              component={NavLink}
              to={`${PATH.PROJECT_PAGE}/${project.id}/${PROJECT_PATH.ISSUE}`}
            >
              List Issue
            </Button>
            <Box display="flex">
              <ButtonGroup variant="outlined" disableElevation>
                <Button sx={{ padding: 'unset' }} onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box>
            <Grid container>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <SiJavascript />
                <Box ml={1}>
                  {project.languages
                    .map((language) => language.name.replace('_', ' '))
                    .join(', ')}
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                flexGrow={1}
                textAlign="left"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <MdOutlineCalendarToday />
                <Box ml={1}>{project.start_date ?? 'N/A'}</Box>
              </Grid>
              <Grid
                item
                xs={6}
                flexGrow={1}
                textAlign="left"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <BsCalendarCheck />
                <Box ml={1}>{project.due_date ?? 'N/A'}</Box>
              </Grid>
              <Grid
                item
                xs={6}
                flexGrow={1}
                textAlign="left"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <BsPeopleFill />
                <Box ml={1}>{project.members.length} Members</Box>
              </Grid>
              <Grid
                item
                xs={6}
                flexGrow={1}
                textAlign="left"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <BsHddStack />
                <Box ml={1}>
                  {
                    PROJECT_TYPES.find(({ value }) => value === project.type)
                      ?.label
                  }
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Box fontSize={15} fontWeight="bold">
                {project?.current_target_version?.name}
              </Box>
              {project?.current_target_version?.due_date && (
                <Box
                  sx={{ backgroundColor: 'pink' }}
                  paddingX={0.5}
                  paddingY={0.4}
                  borderRadius={1}
                  fontSize={14}
                  display="flex"
                  alignItems="center"
                >
                  {project?.current_target_version?.due_date && (
                    <>
                      <AccessTimeIcon fontSize="small" />
                      {`${formatDistanceToNow(
                        new Date(project.current_target_version.due_date),
                      )} left`}
                    </>
                  )}
                </Box>
              )}
            </Box>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  sx={{ height: 8 }}
                  variant="determinate"
                  value={10}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`10%`}</Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};
export default ProjectItem;
