import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

const FormInputText = ({
  name,
  control,
  errors,
  label,
  type = 'text',
  inputId,
  ...rest
}) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor={inputId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <OutlinedInput
            id={inputId}
            type={type}
            onChange={onChange}
            value={value}
            label={label}
            error={!!(errors && errors[name])}
            {...rest}
          />
        )}
      />
    </FormControl>
  );
};
export default FormInputText;
