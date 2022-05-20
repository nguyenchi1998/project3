import Box from '@mui/material/Box';
import {PROJECT_TYPES} from '../../config/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import {
  BsFillCalendarCheckFill,
  BsFillCalendarDateFill,
  BsPeopleFill
} from 'react-icons/bs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {deepOrange} from '@mui/material/colors';
import {PATH} from '../../routes/paths';
import {Link} from 'react-router-dom';
import projectAPI from './../../services/project';
import {useMutation, useQueryClient} from 'react-query';
import {KEY_QUERIES} from '../../config/keyQueries';
import {toast} from 'react-toastify';

const ProjectItem = ({project, handleOpenMembers, handleOpenEdit}) => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation(projectAPI.destroy, {
    onSuccess: () => {
      toast.success('Project delete successfully');
      queryClient.setQueryData([KEY_QUERIES.FETCH_PROJECT], (old) =>
        old.filter(({id}) => project.id !== id),
      );
    },
    onError: () => {
      toast.success('Project delete failed');
    },
  });
  const handleDelete = () => {
    mutate(project.id);
  };
  return (
    <Paper variant="outlined">
      <Box position={'relative'}>
        <Box
          top={-16}
          position={'absolute'}
          width={'100%'}
          display="flex"
          flexDirection={'column'}
          justifyContent="center"
          alignItems={'center'}
        >
          <Avatar
            component={Link}
            to={`${PATH.PROJECT_PAGE}/${project.id}`}
            sx={{bgcolor: deepOrange[500], height: 50, width: 50}}
            variant="square"
          >
            {project.name.charAt(0)}
          </Avatar>
          <Box
            component={Link}
            to={`${PATH.PROJECT_PAGE}/${project.id}`}
            fontWeight={'bold'}
          >
            {project.name}
          </Box>
        </Box>
        <Stack spacing={1.5} p={2}>
          <Box
            mt={6}
            display="flex"
            width="100%"
            justifyContent={'space-between'}
          >
            <Typography>{PROJECT_TYPES[project.type]}</Typography>
            <Box display={'flex'}>
              <ButtonGroup variant="outlined" disableElevation>
                <Button
                  sx={{padding: 'unset'}}
                  onClick={() => handleOpenEdit(project)}
                >
                  <EditIcon color="success" fontSize="small"/>
                </Button>
                <Button sx={{padding: 'unset'}} onClick={handleDelete}>
                  <DeleteIcon color="error" fontSize="small"/>
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
                justifyContent={'flex-start'}
                alignItems="center"
              >
                <BsFillCalendarDateFill/>
                <Box ml={1}>
                  {project.languages
                    .map((language) => language.name)
                    .join(', ')}
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                flexGrow={1}
                textAlign={'left'}
                display="flex"
                justifyContent={'flex-start'}
                alignItems="center"
              >
                <BsFillCalendarCheckFill/>
                <Box ml={1}>{project.end_date ?? 'Unset'}</Box>
              </Grid>
              <Grid
                item
                xs={6}
                flexGrow={1}
                textAlign={'left'}
                display="flex"
                justifyContent={'flex-start'}
                alignItems="center"
              >
                <BsPeopleFill/>
                <Box ml={1}>{project.members.length} Members</Box>
              </Grid>
            </Grid>
          </Box>
          <Divider/>
          <Box>
            <Box display={'flex'} justifyContent="space-between">
              <Box fontSize={14} fontWeight={'bold'}>
                Progress
              </Box>
              <Box
                sx={{backgroundColor: 'pink'}}
                paddingX={0.5}
                paddingY={0.4}
                borderRadius={2}
                fontSize={14}
                display="flex"
                alignItems={'center'}
              >
                <AccessTimeIcon fontSize="small"/>2 month left
              </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress
                  sx={{height: 8}}
                  variant="determinate"
                  value={10}
                />
              </Box>
              <Box sx={{minWidth: 35}}>
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
