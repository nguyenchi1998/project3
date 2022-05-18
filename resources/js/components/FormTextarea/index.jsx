import React from 'react';
import { Controller } from 'react-hook-form';
import { TextareaAutosize, TextField } from '@mui/material';

const FormTextarea = ({ name, control, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextareaAutosize
          style={{
            width: '100%',
            resize: 'none',
            padding: 10,
            borderRadius: 4,
            borderColor: '#ADADAD',
          }}
          onChange={onChange}
          value={value}
          minRows={5}
          placeholder={placeholder}
        />
      )}
    />
  );
};
export default FormTextarea;
