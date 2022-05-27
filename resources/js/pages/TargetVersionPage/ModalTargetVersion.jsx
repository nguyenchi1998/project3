import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import FormDialog from '../../components/FormDialog';
import * as API_CODES from '../../config/API_CODES';
import { KEY_QUERIES } from '../../config/keyQueries';
import FormTextField from '../../components/FormTextField';
import FormInputCheckbox from '../../components/FormInputCheckbox';
import targetVersionAPI from '../../services/targetVersion';

const defaultValues = {
  name: '',
  active: false,
};
const ModalTargetVersion = ({
  handleClose,
  targetVersion,
  keyQuery,
  action,
  projectId,
}) => {
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
  const { mutate, isLoading: isStorePending } = useMutation(
    targetVersionAPI.store,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_TARGET_VERSION, projectId, { ...keyQuery }],
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
          [KEY_QUERIES.FETCH_TARGET_VERSION, projectId, { ...keyQuery }],
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
      mutate(data);
    } else {
      updateMutate(data);
    }
  };
  useEffect(() => {
    if (action === 'edit') {
      targetVersion &&
        reset({
          ...targetVersion,
        });
    } else {
      reset({ ...defaultValues });
    }
  }, [targetVersion, reset]);

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
    >
      <FormTextField
        control={control}
        name="name"
        label="Name"
        errors={errors}
        fullWidth
      />
      <FormInputCheckbox control={control} name="active" label="Active" />
    </FormDialog>
  );
};

export default ModalTargetVersion;
