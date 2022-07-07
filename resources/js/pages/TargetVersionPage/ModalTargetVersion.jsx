import { useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import FormDialog from '../../components/FormDialog';
import * as API_CODES from '../../config/API_CODES';
import { KEY_QUERIES } from '../../config/keyQueries';
import FormTextField from '../../components/FormTextField';
import targetVersionAPI from '../../services/targetVersion';
import { TARGET_VERSION_STATUS } from '../../config/constants';
import FormSelect from '../../components/FormSelect';
import { Stack } from '@mui/material';
import { ProjectContext } from '../../layouts/project';
import FormInputDate from '../../components/FormInputDate';

const OPEN_STATUS = 2;

const defaultValues = {
  name: '',
  status: OPEN_STATUS,
  start_date: new Date(),
  due_date: null,
};
const ModalTargetVersion = ({
  handleClose,
  targetVersion,
  debounceFilter,
  action,
}) => {
  const projectId = useContext(ProjectContext);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { mutate, isLoading: isStorePending } = useMutation(
    targetVersionAPI.store,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_TARGET_VERSION, projectId, { ...debounceFilter }],
          (old) => {
            return [response, ...old];
          },
        );
        handleClose();
        reset({ ...defaultValues });
        toast.success('Target version created successfully');
      },
      onError: ({ response: { data, status } }) => {
        if (status === API_CODES.INVALID_DATA) {
          Object.entries(data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        } else {
          handleClose();
          reset({ ...defaultValues });
          toast.error(data.message);
        }
      },
    },
  );
  const { mutate: updateMutate, isLoading: isUpdatePending } = useMutation(
    targetVersionAPI.update,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_TARGET_VERSION, projectId, { ...debounceFilter }],
          (old) =>
            old.map((oldTargetVersion) =>
              oldTargetVersion.id === targetVersion.id
                ? response
                : oldTargetVersion,
            ),
        );
        handleClose();
        reset({ ...defaultValues });
        toast.success('Target version updated successfully');
      },
      onError: ({ response: { data, status } }) => {
        if (status === API_CODES.INVALID_DATA) {
          Object.entries(data.errors).forEach((error) => {
            const [name, message] = error;
            setError(name, { type: 'custom', message: message[0] });
          });
        } else {
          handleClose();
          reset({ ...defaultValues });
          toast.error(data.message);
        }
      },
    },
  );
  const onSubmit = (data) => {
    if (action === 'create') {
      mutate({
        ...data,
        project_id: projectId,
      });
    } else {
      updateMutate(data);
    }
  };
  useEffect(() => {
    if (action === 'edit' && targetVersion) {
      const { name, status, id } = targetVersion;
      reset({
        name,
        status,
        id,
      });
    } else {
      reset({ ...defaultValues });
    }
  }, [targetVersion]);
  const handleCloseForm = useCallback(() => {
    reset({ ...defaultValues });
    handleClose();
  }, []);

  return (
    <FormDialog
      title={
        action === 'edit' ? 'Edit Target Version' : 'Create Target Version'
      }
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleCloseForm}
      open={!!action}
      isPending={isStorePending || isUpdatePending}
      formId="form-target-version"
      disableEscapeKeyDown={false}
    >
      <Stack spacing={2}>
        <FormTextField
          control={control}
          name="name"
          label="Name"
          errors={errors}
          fullWidth
        />
        <FormInputDate
          name="start_date"
          control={control}
          label="Start Date"
          errors={errors}
        />
        <FormInputDate
          name="due_date"
          control={control}
          label="Due Date"
          errors={errors}
          error={true}
        />
        <FormSelect
          control={control}
          name="status"
          label="Status"
          fullWidth
          options={TARGET_VERSION_STATUS.map(({ label, value }) => ({
            key: label,
            val: value,
          }))}
        />
      </Stack>
    </FormDialog>
  );
};

export default ModalTargetVersion;
