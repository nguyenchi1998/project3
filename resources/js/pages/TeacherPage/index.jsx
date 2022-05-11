import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListResult from 'pages/Manager/TeacherPage/ListResult';
import ListToolbar from 'pages/Manager/TeacherPage/ListToolbar';

const ManagerPage = () => {
  const [keyword, setKeyword] = useState('');
  const handleChangeKeyword = (value) => {
    setKeyword(value);
  };
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 2,
      }}
    >
      <Container maxWidth={false}>
        <ListToolbar onChange={handleChangeKeyword} />
        <Box sx={{ pt: 2 }}>
          <ListResult keyword={keyword} />
        </Box>
      </Container>
    </Box>
  );
};
export default ManagerPage;
