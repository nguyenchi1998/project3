import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListResult from 'pages/Manager/ManagerPage/ListResult';
import { Search as SearchIcon } from 'react-feather';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import { CREATE_ACTION } from 'config/constants';

const ManagerPage = () => {
  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState(null);
  const handleChangeKeyword = (value) => {
    setKeyword(value);
  };
  return (
    <Container maxWidth={false}>
      <Box py={1}>
        <Box sx={{ mt: 1 }}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search Manager"
                    variant="outlined"
                    onChange={handleChangeKeyword}
                  />
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setAction(CREATE_ACTION)}
                  >
                    Create New
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <ListResult keyword={keyword} action={action} setAction={setAction} />
        </Box>
      </Box>
    </Container>
  );
};
export default ManagerPage;
