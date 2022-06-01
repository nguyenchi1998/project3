import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, FormLabel, TextareaAutosize } from '@mui/material';

const FormTextarea = ({ name, control, placeholder, label }) => {
  return (
    <Box position="relative">
      {label && (
        <FormLabel
          sx={{
            position: 'absolute',
            top: -8,
            left: 8,
            px: 1,
            fontSize: 'small',
            backgroundColor: 'white',
          }}
        >
          {label}
        </FormLabel>
      )}
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
    </Box>
  );
};
export default FormTextarea;
