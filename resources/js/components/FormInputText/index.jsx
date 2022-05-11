import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormInputText = ({
  name,
  control,
  errors,
  type = 'text',
  size = 'medium',
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          type={type}
          size={size}
          onChange={onChange}
          value={value}
          error={!!(errors && errors[name])}
          helperText={(errors && errors[name]?.message) ?? ''}
          {...rest}
        />
      )}
    />
  );
};
export default FormInputText;
