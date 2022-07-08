import { useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import FormDialog from '../../../components/FormDialog';
import * as API_CODES from '../../../config/API_CODES';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import { CircularProgress, Stack, TextField } from '@mui/material';
import { EFFORTS, PROJECT_MEMBER_ROLES } from '../../../config/constants';
import FormSelect from '../../../components/FormSelect';
import FormAutocomplete from '../../../components/FormAutocomplete';
import employeeAPI from '../../../services/employee';
import { ProjectContext } from '../../../layouts/project';

const defaultValues = {
  role: 0,
  effort: 100,
  employeeId: null,
};

const ModalMemberProject = ({ handleClose, member, keyQuery, action }) => {
  const projectId = useContext(ProjectContext);
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset, setError } = useForm({
    defaultValues,
  });
  const { mutate: storeMutate, isLoading: isStorePending } = useMutation(
    projectAPI.addMember,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId, { ...keyQuery }],
          () => response,
        );
        handleClose();
        reset(defaultValues);
        toast.success('Member updated successfully');
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
    projectAPI.updateMember,
    {
      onSuccess: (response) => {
        handleClose();
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId, { ...keyQuery }],
          () => response,
        );
        toast.success('Member updated successfully');
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
    const { role, effort } = data;
    if (action === 'edit') {
      updateMutate({
        projectId,
        memberId: member.id,
        role,
        effort,
      });
    } else {
      storeMutate({
        projectId,
        employeeId: data.employeeId?.id,
        role,
        effort,
      });
    }
  };
  useEffect(() => {
    if (action === 'edit') {
      reset({
        role: member?.pivot?.role,
        effort: member?.pivot?.effort,
      });
    } else {
      reset({ ...defaultValues });
    }
  }, [member, reset, action]);
  const handleCloseForm = useCallback(() => {
    reset({ ...defaultValues });
    handleClose();
  }, []);
  const { data: employees, isLoading } = useQuery(
    [KEY_QUERIES.FETCH_EMPLOYEE, { ignoreProjectId: projectId }],
    () =>
      employeeAPI.all({
        ignoreProjectId: projectId,
      }),
    {
      enabled: action === 'create',
    },
  );
  return (
    <FormDialog
      title={action === 'edit' ? 'Edit Member' : 'Add Member'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleCloseForm}
      open={!!action}
      isPending={isUpdatePending || isStorePending}
      formId="form-member"
    >
      <Stack spacing={2}>
        {action === 'create' && (
          <FormAutocomplete
            control={control}
            name="employeeId"
            options={employees ?? []}
            loading={isLoading}
            disableCloseOnSelect={false}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name ?? ''}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employee"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        )}
        <FormSelect
          control={control}
          name="role"
          label="Role"
          fullWidth
          options={PROJECT_MEMBER_ROLES.map(({ label, value }) => ({
            key: label,
            val: value,
          }))}
        />
        <FormSelect
          control={control}
          name="effort"
          label="Effort"
          fullWidth
          options={EFFORTS.map((effort) => ({
            key: `${effort}%`,
            val: effort,
          }))}
        />
      </Stack>
    </FormDialog>
  );
};

export default ModalMemberProject;
