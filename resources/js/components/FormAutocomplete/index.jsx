import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Autocomplete, Checkbox, Box } from '@mui/material';

const FormAutocomplete = ({ name, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...props } }) => (
        <Autocomplete
          multiple
          fullWidth
          autoHighlight
          disableCloseOnSelect
          onChange={(_e, data) => onChange(data)}
          {...props}
          {...rest}
        />
      )}
    />
  );
};
export default FormAutocomplete;
