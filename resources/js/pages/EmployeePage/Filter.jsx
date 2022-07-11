import React, { useCallback, useContext } from 'react';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from './../../config/keyQueries';
import positionAPI from './../../services/position';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { DesktopDatePicker } from '@mui/lab';
import { isValid } from 'date-fns';
import { format } from 'date-fns/esm';

const Filter = ({ totalFilter, onChangeTotalFilter, filterOpen }) => {
  const { data: positions, isPositionLoading } = useQuery(
    [KEY_QUERIES.FETCH_POSITION],
    () => positionAPI.all(),
  );
  const handleChange = useCallback(({ target: { name, value } }) => {
    onChangeTotalFilter({ [name]: value });
  }, []);
  const handleChangeAutocomplete = useCallback((_, value, name) => {
    onChangeTotalFilter({ [name]: value?.id });
  }, []);
  const handleChangeMultiAutocomplete = useCallback((_, value, name) => {
    onChangeTotalFilter({
      [name]: value.map(({ value }) => value),
    });
  }, []);
  const onChangeDate = useCallback((value, name) => {
    onChangeTotalFilter({
      [name]: isValid(value) ? format(new Date(value), 'yyyy-MM-dd') : null,
    });
  }, []);

  return (
    <Box>
      {filterOpen && (
        <Box minWidth={200} py={1} pl={2}>
          <Stack spacing={2}>
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
              isOptionEqualToValue={(option, value) => option.id === value.id}
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
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Filter;
