import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Button,
  Divider,
  Grid,
  Pagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { KEY_QUERIES } from '../../config/keyQueries';
import { useQuery } from 'react-query';
import projectAPI from '../../services/project';
import { PAGINATE_LIMIT, PROJECT_STATUS } from '../../config/constants';
import ModalProject from './ModalProject';
import ModalMember from './ModalMember';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ListSkeleton from './ListSkeleton';
import ProjectItem from './../../container/ProjectItem';
import useDebounce from './../../hooks/useDebounce';
import useQueryParam from '../../hooks/useQueryParam';

const ProjectPage = () => {
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    keyword: '',
    type: '',
    ...params,
  });
  const [page, setPage] = useState(1);
  const [action, setAction] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleMembersClose = useCallback(() => {
    setOpen(false);
    setSelectedProject(null);
  }, []);
  const handleProjectClose = useCallback(() => {
    setAction(null);
    setSelectedProject(null);
  }, []);
  const handleTypeFilter = (_, type) => {
    setFilter({ ...filter, ...{ type: type } });
  };
  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilter({ [name]: value });
  };
  const debounceFilter = useDebounce(filter, 500, true);
  const handlePageChange = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleOpenEdit = useCallback((dataProject) => {
    setSelectedProject(dataProject);
    setAction('edit');
  }, []);
  const { data, isLoading, isSuccess } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, { ...debounceFilter }],
    () => projectAPI.all({ ...debounceFilter }),
  );

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Box>
            <Typography variant="h5" fontWeight={'bold'}>
              Projects
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Button
              onClick={() => {
                setAction('create');
                setSelectedProject(null);
              }}
            >
              <Box ml={1}>Create Project</Box>
            </Button>
            <Box ml={2}>
              <TextField
                variant="outlined"
                placeholder="Search..."
                onChange={handleChangeFilter}
                value={filter.keyword}
                name="keyword"
                size="small"
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ marginY: 2 }} />
        <Box
          display={'flex'}
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Box>
            {isSuccess && !!data.length && (
              <Pagination
                count={Math.ceil(data.length / PAGINATE_LIMIT)}
                page={page}
                defaultPage={1}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            )}
          </Box>
          <ToggleButtonGroup
            value={filter.type}
            exclusive
            color="primary"
            onChange={handleTypeFilter}
          >
            <ToggleButton value="" sx={{ paddingX: 2, paddingY: 0.8 }}>
              All
            </ToggleButton>
            {PROJECT_STATUS.map((status, index) => (
              <ToggleButton
                value={index}
                key={index}
                sx={{ paddingX: 2, paddingY: 0.8 }}
              >
                {status}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ pt: 2 }}>
          {isLoading && <ListSkeleton />}
          {isSuccess && (
            <PerfectScrollbar>
              <Grid container spacing={2}>
                {data
                  .slice(PAGINATE_LIMIT * (page - 1), page * PAGINATE_LIMIT)
                  .map((project) => (
                    <Grid
                      key={project.id}
                      item
                      xs={12}
                      sm={6}
                      lg={4}
                      xl={3}
                      mt={3}
                    >
                      <ProjectItem
                        project={project}
                        handleOpenEdit={handleOpenEdit}
                      />
                    </Grid>
                  ))}
              </Grid>
              {open && (
                <ModalMember
                  open={open}
                  project={selectedProject}
                  handleClose={handleMembersClose}
                />
              )}
              {action && (
                <ModalProject
                  project={selectedProject}
                  action={action}
                  handleClose={handleProjectClose}
                  keyQuery={debounceFilter}
                />
              )}
            </PerfectScrollbar>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default ProjectPage;
