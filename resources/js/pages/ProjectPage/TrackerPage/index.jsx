import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ModalTracker from './ModalTracker';
import useDebounce from '../../../hooks/useDebounce';
import useQueryParam from '../../../hooks/useQueryParam';
import ListTracker from './ListTracker';

const TrackerPage = () => {
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    q: '',
    ...params,
  });
  const [action, setAction] = useState(null);
  const [selectedTracker, setSelectedTracker] = useState(null);
  const handleTrackerClose = useCallback(() => {
    setAction(null);
    setSelectedTracker(null);
  }, []);
  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilter({ [name]: value });
  };
  const debounceFilter = useDebounce(filter, 500, true);
  const handleOpenEdit = useCallback((data) => {
    setSelectedTracker(data);
    setAction('edit');
  }, []);
  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">Trackers</Typography>
          </Box>
          <Box display="flex">
            <Button
              onClick={() => {
                setAction('create');
                setSelectedTracker(null);
              }}
              variant="contained"
            >
              Create
            </Button>
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
        <ListTracker
          debounceFilter={debounceFilter}
          handleOpenEdit={handleOpenEdit}
        />
        {action && (
          <ModalTracker
            tracker={selectedTracker}
            action={action}
            handleClose={handleTrackerClose}
            debounceFilter={debounceFilter}
          />
        )}
      </Box>
    </Container>
  );
};
export default TrackerPage;
