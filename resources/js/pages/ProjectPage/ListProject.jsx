import {
  Box,
  Grid,
  TablePagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import NoData from '../../container/NoData';
import ListSkeleton from './ListSkeleton';
import projectAPI from './../../services/project';
import { PROJECT_STATUS } from '../../config/constants';
import ProjectItem from './../../container/ProjectItem';

const ListProject = ({ debounceFilter, filter, setFilter }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const handleTypeFilter = (_, type) => {
    setFilter({ ...filter, ...{ type: type } });
  };
  const { data, isLoading, error, isError } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, { ...debounceFilter }],
    () => projectAPI.all({ ...debounceFilter }),
  );
  if (isLoading) {
    return <ListSkeleton />;
  }
  if (isError) {
    return <Typography>{error.message}</Typography>;
  }
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ToggleButtonGroup
          value={filter.type}
          exclusive
          color="primary"
          onChange={handleTypeFilter}
        >
          <ToggleButton value="" sx={{ paddingX: 2, paddingY: 0.8 }}>
            All
          </ToggleButton>
          {PROJECT_STATUS.map(({ label, value }) => (
            <ToggleButton
              value={value}
              key={value}
              sx={{ paddingX: 2, paddingY: 0.8 }}
            >
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {data.length ? (
        <Box>
          <Box sx={{ pt: 2 }}>
            <PerfectScrollbar>
              <Grid container spacing={2}>
                {data
                  .slice(rowsPerPage * page, (page + 1) * rowsPerPage)
                  .map((project) => (
                    <Grid
                      key={project.id}
                      item
                      xs={12}
                      sm={6}
                      lg={4}
                      xl={3}
                      mt={3}
                    >
                      <ProjectItem project={project} />
                    </Grid>
                  ))}
              </Grid>
            </PerfectScrollbar>
          </Box>
        </Box>
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default ListProject;
