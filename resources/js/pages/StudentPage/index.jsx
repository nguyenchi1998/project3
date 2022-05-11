import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListResult from 'pages/Manager/StudentPage/ListResult';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import { CREATE_ACTION } from 'config/constants';
import _debounce from 'lodash/debounce';

const StudentPage = () => {
  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState(null);
  const changeKeyword = useCallback(
    _debounce((e) => {
      setKeyword(e);
    }, 500),
    [keyword],
  );
  const handleChangeKeyword = ({ target: { value } }) => {
    changeKeyword(value);
  };
  return (
    <Box paddingY={1}>
      <Container maxWidth={false}>
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
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    placeholder="Search..."
                    variant="outlined"
                    onChange={handleChangeKeyword}
                  />
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => setAction(CREATE_ACTION)}
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <ListResult keyword={keyword} action={action} setAction={setAction} />
        </Box>
      </Container>
    </Box>
  );
};
export default StudentPage;
