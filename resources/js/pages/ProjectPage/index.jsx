import React, {useCallback, useState} from 'react';
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
import {FiPlusCircle} from 'react-icons/fi';
import {KEY_QUERIES} from '../../config/keyQueries';
import {useQuery} from 'react-query';
import projectAPI from '../../services/project';
import {PAGINATE_LIMIT, PROJECT_STATUS} from '../../config/constants';
import {debounce} from 'lodash';
import ModalProject from './ModalProject';
import ModalMember from './ModalMember';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ListSkeleton from './ListSkeleton';
import ProjectItem from './../../container/ProjectItem';

const ProjectPage = () => {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [action, setAction] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const {data, isLoading, isSuccess} = useQuery(
    [KEY_QUERIES.FETCH_PROJECT],
    () => projectAPI.all(),
  );
  const handleMembersClose = useCallback(() => {
    setOpen(false);
    setSelectedProject(null);
  }, []);
  const handleProjectClose = useCallback(() => {
    setAction(null);
    setSelectedProject(null);
  }, []);
  const handleFilter = (_, newFilter) => {
    setType(newFilter);
  };
  const debounceChangeKeyword = useCallback(
    debounce((value) => setKeyword(value), 500),
    [],
  );
  const handleChangeKeyword = ({target: {value}}) => {
    debounceChangeKeyword(value);
  };
  const handlePageChange = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleOpenMembers = useCallback(
    (project) => {
      setSelectedProject(project);
      setOpen(true);
    },
    [open],
  );
  const handleOpenEdit = useCallback((dataProject) => {
    setSelectedProject(dataProject);
    setAction('edit');
  }, []);

  return (
    <Box>
      <Container maxWidth={false}>
        <Box pb={3}>
          <Box sx={{paddingY: 2}}>
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
                  variant="contained"
                  onClick={() => {
                    setAction('create');
                    setSelectedProject(null);
                  }}
                >
                  <FiPlusCircle/>
                  <Box ml={1}>Create Project</Box>
                </Button>
                <Box ml={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    sx={{minWidth: 300, backgroundColor: 'white'}}
                    onChange={handleChangeKeyword}
                  />
                </Box>
              </Box>
            </Box>
            <Divider sx={{paddingY: 1}}/>
          </Box>
          <Box
            display={'flex'}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Box>
              {isSuccess && !!data.length && (
                <Pagination
                  count={Math.floor(data.length / PAGINATE_LIMIT)}
                  page={page}
                  defaultPage={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              )}
            </Box>
            <ToggleButtonGroup
              value={type}
              exclusive
              color="primary"
              onChange={handleFilter}
            >
              <ToggleButton value="" sx={{paddingX: 2, paddingY: 0.8}}>
                All
              </ToggleButton>
              {PROJECT_STATUS.map((status, index) => (
                <ToggleButton
                  value={index}
                  key={index}
                  sx={{paddingX: 2, paddingY: 0.8}}
                >
                  {status}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box sx={{pt: 2}}>
            {isLoading && <ListSkeleton/>}
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
                          handleOpenMembers={handleOpenMembers}
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
                    keyQuery={[keyword, type, page]}
                  />
                )}
              </PerfectScrollbar>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default ProjectPage;
