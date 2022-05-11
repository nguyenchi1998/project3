import React from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const FormInputDate = ({ name, control, label, maxDate, minDate }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DesktopDatePicker
          size="small"
          maxDate={maxDate}
          minDate={minDate}
          inputFormat="dd/MM/yyyy"
          onChange={(e) => onChange(e)}
          label={label}
          value={value}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    />
  );
};
export default FormInputDate;
