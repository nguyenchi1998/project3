import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import FormDialog from '../../components/FormDialog';
import * as API_CODES from '../../config/API_CODES';
import { KEY_QUERIES } from '../../config/keyQueries';
import groupAPI from '../../services/group';
import { CircularProgress, Stack, TextField } from '@mui/material';
import FormSelect from '../../components/FormSelect';
import FormAutocomplete from '../../components/FormAutocomplete';
import FormTextField from '../../components/FormTextField';
import positionAPI from './../../services/position';
import employeeAPI from './../../services/employee';

const defaultValues = {
  name: '',
  email: '',
  position_id: null,
  position_id: null,
};

const ModalEmployeeProject = ({ handleClose, employee, keyQuery, action }) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { mutate: storeMutate, isLoading: isStorePending } = useMutation(
    employeeAPI.store,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_EMPLOYEE, { ...keyQuery }],
          (old) => [...old, response],
        );
        handleClose();
        reset(defaultValues);
        toast.success('Employee updated successfully');
      },
      onError: ({ response: { data, status } }) => {
        if (status === API_CODES.INVALID_DATA) {
          Object.entries(data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        } else {
          handleClose();
          reset(defaultValues);
          toast.error(data.message);
        }
      },
    },
  );
  const { mutate: updateMutate, isLoading: isUpdatePending } = useMutation(
    employeeAPI.update,
    {
      onSuccess: (response) => {
        handleClose();
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_EMPLOYEE, { ...keyQuery }],
          (old) => old.map((e) => (employee.id === e.id ? response : e)),
        );
        toast.success('Employee updated successfully');
      },
      onError: ({ response: { data, status } }) => {
        if (status === API_CODES.INVALID_DATA) {
          Object.entries(data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        } else {
          handleClose();
          toast.error(data.message);
        }
      },
    },
  );
  const onSubmit = (data) => {
    if (action === 'edit') {
      updateMutate(data);
    } else {
      storeMutate({});
    }
  };
  useEffect(() => {
    if (action === 'edit') {
      reset({
        ...employee,
        position_id: employee?.position,
        group_id: employee?.group,
      });
    } else {
      reset({ ...defaultValues });
    }
  }, []);
  const handleCloseForm = useCallback(() => {
    reset({ ...defaultValues });
    handleClose();
  }, []);
  const { data: positions, isLoading: isPositionLoading } = useQuery(
    [KEY_QUERIES.FETCH_POSITION],
    () => positionAPI.all(),
    {
      enabled: !!action,
    },
  );
  const { data: groups, isLoading: isGroupLoading } = useQuery(
    [KEY_QUERIES.FETCH_GROUP],
    () => groupAPI.all(),
    {
      enabled: !!action,
    },
  );
  return (
    <FormDialog
      title={action === 'edit' ? 'Edit Employee' : 'Add Employee'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleCloseForm}
      open={!!action}
      isPending={isUpdatePending || isStorePending}
      formId="form-employee"
    >
      <Stack spacing={2}>
        <FormTextField
          disabled={action == 'edit'}
          control={control}
          name="email"
          errors={errors}
          label="Email"
        />
        <FormTextField
          control={control}
          name="name"
          errors={errors}
          label="Name"
        />
        <FormAutocomplete
          control={control}
          name="position_id"
          options={positions ?? []}
          loading={isPositionLoading}
          disableCloseOnSelect={false}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          getOptionLabel={(option) => option?.name ?? ''}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Position"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isPositionLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <FormAutocomplete
          control={control}
          name="group_id"
          options={groups ?? []}
          loading={isGroupLoading}
          disableCloseOnSelect={false}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          getOptionLabel={(option) =>
            `${option?.division.name} - ${option?.name}` ?? ''
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Group"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isGroupLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Stack>
    </FormDialog>
  );
};

export default ModalEmployeeProject;
