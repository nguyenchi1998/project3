import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import managerAPI from 'services/manager';
import {useMutation, useQueryClient} from 'react-query';
import FormDialog from 'components/FormDialog';
import FormInputRadio from 'components/FormInputRadio';
import FormInputDate from 'components/FormInputDate';
import {useForm} from 'react-hook-form';
import FormInputText from 'components/FormInputText';
import {KEY_QUERIES} from 'config/keyQueries';
import {now} from 'moment';
import Avatar from '@mui/material/Avatar';
import {styled} from '@mui/material/styles';
import {toast} from 'react-toastify';
import * as API_CODE from 'config/API_CODES';
import {CREATE_ACTION, EDIT_ACTION} from 'config/constants';

const Input = styled('input')({
  display: 'none',
});

const Label = styled('label')({
  width: 'min-content',
  cursor: 'pointer',
});

const genders = [
  {label: 'Male', value: 0},
  {label: 'Female', value: 1},
];

const defaultValues = {
  email: 'abc@abc.co',
  gender: 1,
  address: '',
  phone: '123',
  name: 'chi',
  birthday: '12/12/1990',
};

const ManagerForm = ({action, manager, handleCloseForm}) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    control,
    reset,
    setError,
    formState: {errors},
    ...methods
  } = useForm({
    defaultValues,
  });

  const {mutate: mutateStore} = useMutation(managerAPI.store);
  const {mutate: mutateUpdate} = useMutation(managerAPI.update);
  useEffect(() => {
    if (action === EDIT_ACTION) {
      reset({...manager, address: manager.address ?? ''});
    } else {
      reset({...defaultValues});
    }
  }, [manager, reset, action]);
  const handleClose = () => {
    reset({...defaultValues});
    handleCloseForm();
  };
  const onSubmit = (managerData) => {
    if (action === CREATE_ACTION) {
      mutateStore(managerData, {
        onError: ({response}) => {
          if (response.status === API_CODE.INVALIDATE_DATA)
            Object.entries(response.data.errors).forEach((e) =>
              setError(e[0], {type: 'custom', message: e[1][0]}),
            );
        },
        onSuccess: ({data}) => {
          queryClient.setQueryData([KEY_QUERIES.FETCH_MANAGER], (old) => [
            data,
            ...old,
          ]);
          handleClose();
          toast('Wow so easy!');
        },
      });
    }
    if (action === EDIT_ACTION) {
      mutateUpdate(managerData);
    }
  };

  return (
    <FormDialog
      open={!!action}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      methods={methods}
      title={action === EDIT_ACTION ? 'Edit Manager' : 'Create Manager'}
    >
      <Stack spacing={2}>
        <Box display="flex">
          <Box width={100} m="auto">
            <Label htmlFor="avatar-file">
              <Avatar sx={{width: 100, height: 100}}>Avatar</Avatar>
              <Input
                accept="image/*"
                id="avatar-file"
                type="file"
                name="avatar"
              />
            </Label>
          </Box>
          <Box ml={1} flexGrow={1}>
            <Stack spacing={2}>
              <FormInputText
                control={control}
                name="name"
                label="Full name"
                errors={errors}
              />
              <FormInputText
                control={control}
                name="email"
                label="Email"
                errors={errors}
              />
            </Stack>
          </Box>
        </Box>
        <FormInputText
          control={control}
          name="phone"
          label="Phone"
          errors={errors}
        />
        <FormInputDate
          control={control}
          name="birthday"
          label="Birthday"
          maxDate={now()}
        />
        <FormInputText control={control} name="address" label="Address"/>
        <FormInputRadio
          control={control}
          name="gender"
          isRow
          options={genders}
        />
      </Stack>
    </FormDialog>
  );
};

export default ManagerForm;
