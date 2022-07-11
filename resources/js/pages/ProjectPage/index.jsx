import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Divider, TextField, Typography } from '@mui/material';
import ModalCreateProject from './ModalCreateProject';
import useDebounce from './../../hooks/useDebounce';
import useQueryParam from '../../hooks/useQueryParam';
import ListProject from './ListProject';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/slices/user';
import {
  CREATE_PROJECT_PERMISSION,
  MANAGER_ROLE,
} from '../../config/constants';
import useAuthRole from '../../hooks/useAuthRole';

const ProjectPage = () => {
  const auth = useSelector(selectAuth);
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    q: '',
    type: '',
    ...params,
  });
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateClose = useCallback(() => {
    setCreateOpen(false);
  }, []);
  const canCreateProject = useAuthRole({
    roles: MANAGER_ROLE,
    permissions: CREATE_PROJECT_PERMISSION,
  });
  const handleChangeFilter = useCallback(({ target: { name, value } }) => {
    setFilter({ [name]: value });
  }, []);
  const debounceFilter = useDebounce(filter, 500, true);

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Projects
            </Typography>
          </Box>
          <Box display="flex">
            {canCreateProject && (
              <Button
                onClick={() => {
                  setCreateOpen(true);
                }}
                variant="contained"
              >
                <Box>Create</Box>
              </Button>
            )}
            <Box ml={2}>
              <TextField
                variant="outlined"
                placeholder="Search..."
                onChange={handleChangeFilter}
                value={filter.q}
                name="q"
                size="small"
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <ListProject
          debounceFilter={debounceFilter}
          setFilter={setFilter}
          filter={filter}
        />
        {createOpen && (
          <ModalCreateProject
            open={createOpen}
            handleClose={handleCreateClose}
            keyQuery={debounceFilter}
          />
        )}
      </Box>
    </Container>
  );
};
export default ProjectPage;
