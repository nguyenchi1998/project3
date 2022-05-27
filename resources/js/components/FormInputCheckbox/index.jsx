import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@mui/material';

const FormInputCheckbox = ({ name, control, label }) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <FormControlLabel control={<Checkbox {...field} />} label={label} />
          );
        }}
      />
    </FormControl>
  );
};
export default FormInputCheckbox;
