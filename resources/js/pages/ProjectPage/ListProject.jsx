import { Box, Grid, TablePagination, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import NoData from '../../components/NoData';
import ListSkeleton from './ListSkeleton';
import projectAPI from './../../services/project';
import ProjectItem from './../../container/ProjectItem';

const ListProject = ({ debounceFilter }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

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
      {data.length ? (
        <Box>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
