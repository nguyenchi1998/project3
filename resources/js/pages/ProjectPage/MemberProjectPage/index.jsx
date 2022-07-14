import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useDebounce from '../../../hooks/useDebounce';
import useQueryParam from '../../../hooks/useQueryParam';
import ModalMemberProject from './ModalMemberProject';
import ListMember from './ListMember';

const MemberProjectPage = () => {
  const params = useQueryParam();
  const [filter, setFilter] = useState({
    q: '',
    ...params,
  });
  const [action, setAction] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const handleMemberClose = useCallback(() => {
    setSelectedMember(null);
    setAction(null);
  }, []);
  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilter({ [name]: value });
  };
  const debounceFilter = useDebounce(filter);

  const handleOpenEdit = useCallback((data) => {
    setSelectedMember(data);
    setAction('edit');
  }, []);

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">Members</Typography>
          </Box>
          <Box display="flex">
            <Button
              onClick={() => {
                setAction('create');
                setSelectedMember(null);
              }}
              variant="contained"
            >
              Add New
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
        <ListMember
          debounceFilter={debounceFilter}
          handleOpenEdit={handleOpenEdit}
        />
        {!!action && (
          <ModalMemberProject
            member={selectedMember}
            handleClose={handleMemberClose}
            keyQuery={debounceFilter}
            action={action}
          />
        )}
      </Box>
    </Container>
  );
};
export default MemberProjectPage;
