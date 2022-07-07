import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Divider, TextField, Typography } from '@mui/material';
import ModalCreateProject from './ModalCreateProject';
import useDebounce from './../../hooks/useDebounce';
import useQueryParam from '../../hooks/useQueryParam';
import ListProject from './ListProject';

const ProjectPage = () => {
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    keyword: '',
    type: '',
    ...params,
  });
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateClose = useCallback(() => {
    setCreateOpen(false);
  }, []);

  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilter({ [name]: value });
  };
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
            <Button
              onClick={() => {
                setCreateOpen(true);
              }}
              variant="contained"
            >
              <Box>Create</Box>
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
