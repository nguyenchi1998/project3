import React, { useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ListSkeleton from './ListSkeleton';
import { Grid } from '@mui/material';
import ModalMember from './ModalMember';
import ProjectItem from './../../container/ProjectItem';
import ModalProject from './ModalProject';

const ListResult = ({ data, isLoading, isError, action, setAction }) => {
  const [open, setOpen] = useState(false);
  const handleMembersClose = useCallback(() => {
    setOpen(false);
    setSelectedProject(null);
  }, []);
  const handleProjectClose = useCallback(() => {
    setAction(null);
    setSelectedProject(null);
  }, []);
  const [selectedProject, setSelectedProject] = useState(null);
  const handleOpenMembers = useCallback(
    (project) => {
      setSelectedProject(project);
      setOpen(true);
    },
    [open],
  );
  const handleOpenEdit = (dataProject) => {
    setSelectedProject(dataProject);
    setAction('edit');
  };
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
              handleOpenEdit={handleOpenEdit}
            />
          </Grid>
        ))}
      </Grid>
      {open && (
        <ModalMember
          project={selectedProject}
          open={open}
          handleClose={handleMembersClose}
        />
      )}
      {action && (
        <ModalProject
          action={action}
          handleCloseForm={handleProjectClose}
          project={selectedProject}
        />
      )}
    </PerfectScrollbar>
  );
};

export default ListResult;
