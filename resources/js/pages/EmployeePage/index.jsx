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
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import _isEmpty from 'lodash/isEmpty';
import Filter from '../../container/Filter';
import positionAPI from './../../services/position';
import { useQuery } from 'react-query';
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
} from '@mui/material';
import { KEY_QUERIES } from '../../config/keyQueries';

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

  const { data: positions, isPositionLoading } = useQuery(
    [KEY_QUERIES.FETCH_POSITION],
    () => positionAPI.all(),
    { enabled: !!filterOpen },
  );

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
            onChangeTotalFilter={onChangeTotalFilter}
            filterOpen={filterOpen}
          >
            {({ handleChange, handleChangeAutocomplete }) => (
              <>
                <FormControl fullWidth>
                  <TextField
                    label="Keyword"
                    name="q"
                    value={totalFilter?.q}
                    onChange={handleChange}
                  />
                </FormControl>
                <Autocomplete
                  onChange={(e, value) =>
                    handleChangeAutocomplete(e, value, 'positionId')
                  }
                  value={
                    positions?.find(
                      (position) => position.id === totalFilter?.positionId,
                    ) ?? null
                  }
                  options={positions ?? []}
                  loading={isPositionLoading}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => option?.name ?? ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Position"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isPositionLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </>
            )}
          </Filter>
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
