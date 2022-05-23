import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FormSelect = ({
  name,
  label,
  control,
  defaultValue,
  options,
  ...rest
}) => {
  return (
    <FormControl {...rest}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select value={value} label={label} onChange={onChange}>
            {options.map(({ key, val }) => (
              <MenuItem key={val} value={val}>
                {key}
              </MenuItem>
            ))}
          </Select>
        )}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default FormSelect;
