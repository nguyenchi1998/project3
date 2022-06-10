import React, { useCallback, useContext, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Divider, Typography } from '@mui/material';
import ModalCreateIssue from './ModalCreateIssue';
import useQueryParam from '../../hooks/useQueryParam';
import useDebounce from '../../hooks/useDebounce';
import ListIssues from './ListIssues';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import _isEmpty from 'lodash/isEmpty';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/slices/user';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from './../../services/project';
import { ProjectContext } from '../../layouts/project';

const IssuesProjectPage = () => {
  const projectId = useContext(ProjectContext);
  const params = useQueryParam();
  const auth = useSelector(selectAuth);
  const [openIssue, setOpenIssue] = useState(false);
  const [filterOpen, setFilterOpen] = useState(!_isEmpty(params));
  const [totalFilter, setTotalFilter] = useState({
    name: '',
    assigneeId: '',
    authorId: '',
    trackerId: '',
    status: [],
    priority: '',
    percent: '',
    startDate: null,
    dueDate: null,
    ...params,
  });
  const handleToggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const onChangeTotalFilter = (filter) => {
    const newFilter = { ...totalFilter, ...filter };
    setTotalFilter(newFilter);
  };
  const handleOpenIssue = useCallback(() => {
    setOpenIssue(true);
  }, []);
  const handleCloseIssue = useCallback(() => {
    setOpenIssue(false);
  }, []);
  const debounceFilter = useDebounce(totalFilter, 500, true);

  const { data } = useQuery([KEY_QUERIES.FETCH_MEMBER_PROJECT, projectId], () =>
    projectAPI.getMembers({ projectId }),
  );

  const isInProject = useMemo(() => {
    return data?.some(({ id }) => auth?.id);
  }, [data, auth]);

  return (
    <Container maxWidth={false}>
      <Box py={2} display="flex" justifyContent="space-between">
        <Box flexGrow={1}>
          <Box
            pb={0}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography flexGrow={1} variant="h5" component={Box}>
              Issues
            </Typography>
            {isInProject && (
              <Button onClick={handleOpenIssue} variant="contained">
                New Issue
              </Button>
            )}
            <Box ml={2}>
              <Button onClick={handleToggleFilter} variant="contained">
                <Typography>Filter</Typography>
                {filterOpen ? (
                  <KeyboardDoubleArrowRightIcon />
                ) : (
                  <KeyboardDoubleArrowLeftIcon />
                )}
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Box display="flex" justifyContent="space-between">
            <ListIssues
              debounceFilter={debounceFilter}
              totalFilter={totalFilter}
              onChangeTotalFilter={onChangeTotalFilter}
              filterOpen={filterOpen}
              handleToggleFilter={handleToggleFilter}
            />
            <Filter
              filterOpen={filterOpen}
              handleToggleFilter={handleToggleFilter}
              totalFilter={totalFilter}
              onChangeTotalFilter={onChangeTotalFilter}
            />
          </Box>
        </Box>
      </Box>
      {openIssue && (
        <ModalCreateIssue
          open={openIssue}
          handleClose={handleCloseIssue}
          debounceFilter={debounceFilter}
        />
      )}
    </Container>
  );
};

export default IssuesProjectPage;
