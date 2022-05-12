import React, { useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useQuery } from 'react-query';
import ListSkeleton from './ListSkeleton';
import { PROJECT_TYPES } from '../../config/constants';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import FolderIcon from '@mui/icons-material/Folder';
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
import ModalMember from './ModalMember';
import ProjectItem from './../../container/ProjectItem';

const ListResult = ({ data, isLoading, isError }) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);
  const [selectedProject, setSelectedProject] = useState(null);
  const handleOpenMembers = useCallback(
    (project) => {
      setSelectedProject(project);
      setOpen(true);
    },
    [open],
  );
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
          <Grid key={project.id} item xs={12} sm={6} lg={4} xl={3} mt={3}>
            <ProjectItem
              project={project}
              handleOpenMembers={handleOpenMembers}
            />
          </Grid>
        ))}
      </Grid>
      {open && (
        <ModalMember
          project={selectedProject}
          open={open}
          handleClose={handleClose}
        />
      )}
    </PerfectScrollbar>
  );
};

export default ListResult;
