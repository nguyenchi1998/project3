import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useDebounce from '../../hooks/useDebounce';
import ModalEmployee from './ModalEmployee';
import ListEmployee from './ListEmployee';
import useQueryParam from '../../hooks/useQueryParam';
import Filter from './Filter';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import _isEmpty from 'lodash/isEmpty';

const EmployeePage = () => {
  const params = useQueryParam();
  const [filterOpen, setFilterOpen] = useState(!_isEmpty(params));
  const [totalFilter, setTotalFilter] = useState({
    q: '',
    positionId: '',
    ...params,
  });
  const [action, setAction] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const handleToggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const onChangeTotalFilter = (filter) => {
    const newFilter = { ...totalFilter, ...filter };
    setTotalFilter(newFilter);
  };
  const handleEmployeeClose = useCallback(() => {
    setSelectedEmployee(null);
    setAction(null);
  }, []);
  const debounceFilter = useDebounce(totalFilter, 500, true);

  const handleOpenEdit = useCallback((data) => {
    setSelectedEmployee(data);
    setAction('edit');
  }, []);

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">Employees</Typography>
          </Box>
          <Box display="flex">
            <Button
              onClick={() => {
                setAction('create');
                setSelectedEmployee(null);
              }}
              variant="contained"
            >
              New Employee
            </Button>
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
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Box display="flex" justifyContent="space-between">
          <Box flexGrow={1}>
            <ListEmployee
              debounceFilter={debounceFilter}
              handleOpenEdit={handleOpenEdit}
            />
          </Box>
          <Filter
            filterOpen={filterOpen}
            handleToggleFilter={handleToggleFilter}
            totalFilter={totalFilter}
            onChangeTotalFilter={onChangeTotalFilter}
          />
        </Box>
        {!!action && (
          <ModalEmployee
            employee={selectedEmployee}
            handleClose={handleEmployeeClose}
            keyQuery={debounceFilter}
            action={action}
          />
        )}
      </Box>
    </Container>
  );
};
export default EmployeePage;
