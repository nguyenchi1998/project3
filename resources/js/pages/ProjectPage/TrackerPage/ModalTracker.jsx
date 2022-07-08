import { useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import FormDialog from '../../../components/FormDialog';
import * as API_CODES from '../../../config/API_CODES';
import { KEY_QUERIES } from '../../../config/keyQueries';
import FormTextField from '../../../components/FormTextField';
import trackerAPI from '../../../services/tracker';
import { ProjectContext } from '../../../layouts/project';

const defaultValues = {
  name: '',
};
const ModalTracker = ({ handleClose, tracker, debounceFilter, action }) => {
  const projectId = useContext(ProjectContext);
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
  const { mutate, isLoading: isStorePending } = useMutation(trackerAPI.store, {
    onSuccess: (response) => {
      queryClient.setQueryData(
        [KEY_QUERIES.FETCH_TRACKER, projectId, { ...debounceFilter }],
        (old) => {
          return [response, ...old];
        },
      );
      handleClose();
      reset({ ...defaultValues });
      toast.success('Tracker created successfully');
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
  });
  const { mutate: updateMutate, isLoading: isUpdatePending } = useMutation(
    trackerAPI.update,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_TRACKER, projectId, { ...debounceFilter }],
          (old) =>
            old.map((oldTracker) =>
              oldTracker.id === tracker.id ? response : oldTracker,
            ),
        );
        handleClose();
        reset({ ...defaultValues });
        toast.success('Tracker updated successfully');
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
      tracker &&
        reset({
          ...tracker,
        });
    } else {
      reset({ ...defaultValues });
    }
  }, [tracker, reset]);

  const handleCloseForm = useCallback(() => {
    reset({ ...defaultValues });
    handleClose();
  }, []);
  return (
    <FormDialog
      title={action === 'edit' ? 'Edit Tracker' : 'Create Tracker'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleCloseForm}
      open={!!action}
      isPending={isStorePending || isUpdatePending}
      formId="form-tracker"
    >
      <FormTextField
        control={control}
        name="name"
        label="Name"
        errors={errors}
        fullWidth
      />
    </FormDialog>
  );
};

export default ModalTracker;
