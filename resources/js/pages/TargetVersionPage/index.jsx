import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ModalTargetVersion from './ModalTargetVersion';
import useDebounce from '../../hooks/useDebounce';
import useQueryParam from '../../hooks/useQueryParam';
import ListTargetVersion from './ListTargetVersion';

const TargetVersionPage = ({ projectId }) => {
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    keyword: '',
    ...params,
  });
  const [action, setAction] = useState(null);
  const [selectedTargetVersion, setSelectedTargetVersion] = useState(null);
  const handleTargetVersionClose = useCallback(() => {
    setAction(null);
    setSelectedTargetVersion(null);
  }, []);
  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilter({ [name]: value });
  };
  const debounceFilter = useDebounce(filter, 500, true);
  const handleOpenEdit = useCallback((data) => {
    setSelectedTargetVersion(data);
    setAction('edit');
  }, []);

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">Target Versions</Typography>
          </Box>
          <Box display={'flex'}>
            <Button
              onClick={() => {
                setAction('create');
                setSelectedTargetVersion(null);
              }}
            >
              Create Target Versions
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
        <ListTargetVersion
          debounceFilter={debounceFilter}
          projectId={projectId}
          handleOpenEdit={handleOpenEdit}
        />
        {!!action && (
          <ModalTargetVersion
            targetVersion={selectedTargetVersion}
            action={action}
            handleClose={handleTargetVersionClose}
            keyQuery={debounceFilter}
            projectId={projectId}
          />
        )}
      </Box>
    </Container>
  );
};
export default TargetVersionPage;
