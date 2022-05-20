import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ListToolbar = ({onChange}) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button>Import</Button>
        <Button sx={{mx: 1}}>Export</Button>
        <Button color="primary" variant="contained">
          Add Student
        </Button>
      </Box>
      <Box sx={{mt: 3}}>
        <Card>
          <CardContent>
            <Box sx={{maxWidth: 500}}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon/>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Student"
                variant="outlined"
                onChange={onChange}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ListToolbar;
