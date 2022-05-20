import React from 'react';
import {Controller} from 'react-hook-form';
import {Autocomplete, TextField} from '@mui/material';

const FormAutocomplete = ({name, control, ...rest}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, ...props}}) => (
        <Autocomplete
          fullWidth
          autoHighlight
          disableCloseOnSelect
          onChange={(_e, data) => onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
          {...props}
          {...rest}
        />
      )}
    />
  );
};
export default FormAutocomplete;
