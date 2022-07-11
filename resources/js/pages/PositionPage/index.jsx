import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListPosition from './ListPosition';

const PositionPage = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const handlePositionClose = useCallback(() => {
    setSelectedPosition(null);
  }, []);
  const handleOpenEdit = useCallback((data) => {
    setSelectedPosition(data);
  }, []);

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">Positions</Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <ListPosition handleOpenEdit={handleOpenEdit} />
        {!!selectedPosition && (
          <ModalPosition
            position={selectedPosition}
            handleClose={handlePositionClose}
            open={!!selectedPosition}
          />
        )}
      </Box>
    </Container>
  );
};
export default PositionPage;
