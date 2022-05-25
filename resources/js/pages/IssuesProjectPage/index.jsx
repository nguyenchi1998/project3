import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import ModalCreateIssue from './ModalCreateIssue';
import Filter from './Filter';
import useQueryParam from '../../hooks/useQueryParam';
import useDebounce from '../../hooks/useDebounce';
import ListIssues from './ListIssues';

const IssuesProjectPage = () => {
  const { projectId } = useParams();
  const params = useQueryParam();
  const [openIssue, setOpenIssue] = useState(false);
  const [totalFilter, setTotalFilter] = useState({
    name: '',
    assigneeId: '',
    authorId: '',
    trackerId: '',
    status: '',
    priority: '',
    percent: '',
    startDate: null,
    endDate: null,
    ...params,
  });
  const onChangeFilter = (filter) => {
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

  return (
    <Container maxWidth={false}>
      <Box py={2} display="flex" justifyContent="space-between">
        <Box flexGrow={1}>
          <Box
            py={2}
            pb={0}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography flexGrow={1} variant="h5" component={Box}>
              Issues
            </Typography>
            <Button variant="contained" onClick={handleOpenIssue}>
              New Issue
            </Button>
          </Box>
          <ListIssues filter={debounceFilter} />
        </Box>
        <Filter
          projectId={projectId}
          filter={totalFilter}
          onChangeFilter={onChangeFilter}
        />
      </Box>
      {openIssue && (
        <ModalCreateIssue open={openIssue} handleClose={handleCloseIssue} />
      )}
    </Container>
  );
};

export default IssuesProjectPage;
