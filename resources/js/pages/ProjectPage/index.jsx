import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListResult from './ListResult';
import {
  Button,
  Divider,
  Input,
  Pagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { FiPlusCircle } from 'react-icons/fi';
import { KEY_QUERIES } from '../../config/keyQueries';
import { useQuery } from 'react-query';
import projectAPI from '../../services/project';
import { PROJECT_STATUS } from '../../config/constants';
import { debounce } from 'lodash';
import ModalProject from './ModalProject';

const LIMIT = 6;

const ProjectPage = () => {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [action, setAction] = useState(null);
  const handleFilter = (_, newFilter) => {
    setType(newFilter);
  };
  const debounceChangeKeyword = useCallback(
    debounce((value) => setKeyword(value), 500),
    [],
  );
  const handleChangeKeyword = ({ target: { value } }) => {
    debounceChangeKeyword(value);
  };
  const handlePageChange = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const { data, isLoading, isError, isSuccess } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, keyword, type],
    () => projectAPI.all({ keyword, type }),
  );
  return (
    <Box>
      <Container maxWidth={false}>
        <Box paddingY={3}>
          <Box sx={{ paddingY: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={'center'}
            >
              <Box>
                <Typography variant="h5" fontWeight={'bold'}>
                  Projects
                </Typography>
              </Box>
              <Box display={'flex'}>
                <Button variant="contained" onClick={() => setAction('create')}>
                  <FiPlusCircle />
                  <Box ml={1}>Create Project</Box>
                </Button>
                <Box ml={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    sx={{ minWidth: 300, backgroundColor: 'white' }}
                    onChange={handleChangeKeyword}
                  />
                </Box>
              </Box>
            </Box>
            <Divider sx={{ paddingY: 1 }} />
          </Box>
          <Box
            display={'flex'}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Box>
              {isSuccess && !!data?.length && (
                <Pagination
                  count={Math.round(data.length / LIMIT)}
                  page={page}
                  defaultPage={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              )}
            </Box>
            <ToggleButtonGroup
              value={type}
              exclusive
              color="primary"
              onChange={handleFilter}
            >
              <ToggleButton value="" sx={{ paddingX: 2, paddingY: 0.8 }}>
                All
              </ToggleButton>
              {PROJECT_STATUS.map((status, index) => (
                <ToggleButton
                  value={index}
                  key={index}
                  sx={{ paddingX: 2, paddingY: 0.8 }}
                >
                  {status}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ pt: 2 }}>
            <ListResult
              isLoading={isLoading}
              isError={isError}
              data={data?.slice((page - 1) * LIMIT, page * LIMIT)}
              keyword={keyword}
              type={type}
              action={action}
              setAction={setAction}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default ProjectPage;
