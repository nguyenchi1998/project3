import React, { useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useQuery } from 'react-query';
import ListSkeleton from './ListSkeleton';
import { PROJECT_TYPE } from '../../config/constants';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import GroupIcon from '@mui/icons-material/Group';
import { BsFillCalendarDateFill, BsPeopleFill } from 'react-icons/bs';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { deepOrange } from '@mui/material/colors';

const ListResult = ({ data, isLoading, isError }) => {
  if (isError) {
    return <>{error.message}</>;
  }
  if (isLoading) {
    return <ListSkeleton />;
  }
  return (
    <PerfectScrollbar>
      <Grid container spacing={2}>
        {data.map((project) => (
          <Grid key={project.id} item xs={4} bgcolor="unset" mt={3}>
            <Paper>
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
                  <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                    {project.name.charAt(0)}
                  </Avatar>
                  <Box fontWeight={'bold'}>{project.name}</Box>
                </Box>
                <Stack spacing={1.5} p={2}>
                  <Box
                    mt={6}
                    display="flex"
                    width="100%"
                    justifyContent={'space-between'}
                  >
                    <Typography>{PROJECT_TYPE[project.type]}</Typography>
                    <Box display={'flex'}>
                      <ButtonGroup variant="outlined" disableElevation>
                        <Button sx={{ padding: 'unset' }}>
                          <EditIcon color="success" fontSize="small" />
                        </Button>
                        <Button sx={{ padding: 'unset' }}>
                          <DeleteIcon color="error" fontSize="small" />
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Box>
                  <Box>
                    <AvatarGroup total={10} sx={{ justifyContent: 'flex-end' }}>
                      <Avatar sizes="small" alt="Remy Sharp" />
                      <Avatar sizes="small" alt="Travis Howard" />
                    </AvatarGroup>
                  </Box>
                  <Box>
                    <Grid container>
                      <Grid
                        item
                        xs={6}
                        display="flex"
                        justifyContent={'flex-start'}
                        alignItems="center"
                      >
                        <BsFillCalendarDateFill />
                        <Box ml={1}>{project.start_date ?? 'Unset'}</Box>
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
                        <BsPeopleFill />
                        <Box ml={1}>{project.members.length} Members</Box>
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
                        <BsFillCalendarCheckFill />
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
                        <BsPeopleFill />
                        <Box ml={1}>{project.members.length} Members</Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Box>
                    <Box display={'flex'} justifyContent="space-between">
                      <Box fontSize={14} fontWeight={'bold'}>
                        Progress
                      </Box>
                      <Box
                        sx={{ backgroundColor: 'pink' }}
                        paddingX={0.5}
                        paddingY={0.4}
                        borderRadius={2}
                        fontSize={14}
                        display="flex"
                        alignItems={'center'}
                      >
                        <AccessTimeIcon fontSize="small" />2 month left
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Grid>
        ))}
      </Grid>
    </PerfectScrollbar>
  );
};
export default ListResult;
