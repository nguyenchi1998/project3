import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Controller } from 'react-hook-form';

const FormInputRadio = ({ name, control, options = [], isRow = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormControl component="fieldset">
            <FormLabel>Gender</FormLabel>
            <RadioGroup row={isRow} name="gender" {...field}>
              {options.map(({ label, value: gender }) => (
                <FormControlLabel
                  key={label}
                  value={gender}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
};
export default FormInputRadio;
