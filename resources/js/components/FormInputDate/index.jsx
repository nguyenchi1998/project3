import React from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';

const FormInputDate = ({ name, control, label, maxDate, minDate, ...rest }) => {
  return (
    <FormControl {...rest}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DesktopDatePicker
            maxDate={maxDate}
            minDate={minDate}
            onChange={(e) => onChange(e)}
            label={label}
            value={value}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </FormControl>
  );
};
export default FormInputDate;
