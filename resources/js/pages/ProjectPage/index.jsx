import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ModalCreateProject from './ModalCreateProject';
import useDebounce from './../../hooks/useDebounce';
import useQueryParam from '../../hooks/useQueryParam';
import ListProject from './ListProject';
import {
  CREATE_PROJECT_PERMISSION,
  MANAGER_ROLE,
  PROJECT_STATUS,
} from '../../config/constants';
import useAllowRoleOrPermission from '../../hooks/useAllowRoleOrPermission';
import WrapFilter from '../../components/WrapFilter';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import _isEmpty from 'lodash/isEmpty';

const ProjectPage = () => {
  const params = useQueryParam();
  const [createOpen, setCreateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(!_isEmpty(params));
  const [totalFilter, setTotalFilter] = useState({
    q: '',
    type: '',
    ...params,
  });
  const debounceFilter = useDebounce(totalFilter);
  const handleToggleFilter = useCallback(() => {
    setFilterOpen(!filterOpen);
  }, [filterOpen]);
  const onChangeTotalFilter = (filter) => {
    const newFilter = { ...totalFilter, ...filter };
    setTotalFilter(newFilter);
  };
  const handleCreateClose = useCallback(() => {
    setCreateOpen(false);
  }, []);
  const canCreateProject = useAllowRoleOrPermission({
    roles: MANAGER_ROLE,
    permissions: CREATE_PROJECT_PERMISSION,
  });

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
                Create New
              </Button>
            )}
            <Box ml={2}>
              <Button onClick={handleToggleFilter} variant="contained">
                <Typography>Filter</Typography>
                {filterOpen ? (
                  <KeyboardDoubleArrowRightIcon />
                ) : (
                  <KeyboardDoubleArrowLeftIcon />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Box display="flex" justifyContent="space-between">
          <Box flexGrow={1}>
            <ListProject debounceFilter={debounceFilter} />
          </Box>

          <WrapFilter
            onChangeTotalFilter={onChangeTotalFilter}
            filterOpen={filterOpen}
          >
            {({ handleChange }) => (
              <>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Search..."
                    label="Keyword"
                    name="q"
                    value={totalFilter?.q}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={totalFilter.type}
                    label="Type"
                    onChange={handleChange}
                    name="type"
                  >
                    <MenuItem value="">All</MenuItem>
                    {PROJECT_STATUS.map(({ label, value }) => (
                      <MenuItem value={value} key={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </WrapFilter>
        </Box>
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
