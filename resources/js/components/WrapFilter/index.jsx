import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { isValid } from 'date-fns';
import { format } from 'date-fns/esm';

const Filter = ({ onChangeTotalFilter, filterOpen, children, ...rest }) => {
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
    <Box {...rest}>
      {filterOpen && (
        <Box minWidth={200} py={1} pl={2}>
          <Stack spacing={2}>
            {children({
              handleChange,
              handleChangeAutocomplete,
              handleChangeMultiAutocomplete,
              onChangeDate,
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Filter;
