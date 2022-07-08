import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ModalRole from './ModalRole';
import ListRole from './ListRole';

const RolePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const handleRoleClose = useCallback(() => {
    setSelectedRole(null);
  }, []);
  const handleOpenEdit = useCallback((data) => {
    setSelectedRole(data);
  }, []);

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">Roles</Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <ListRole handleOpenEdit={handleOpenEdit} />
        {!!selectedRole && (
          <ModalRole
            role={selectedRole}
            handleClose={handleRoleClose}
            open={!!selectedRole}
          />
        )}
      </Box>
    </Container>
  );
};
export default RolePage;
