import {Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import FormDialog from '../../components/FormDialog';
import FormInputDate from '../../components/FormInputDate';
import {useParams} from 'react-router-dom';
import FormInputText from '../../components/FormInputText';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import {
  TASK_PRIORITIES,
  TASK_STATUS,
  TASK_TYPES,
} from '../../config/constants';
import * as API_CODES from './../../config/API_CODES';
import taskAPI from './../../services/task';
import {KEY_QUERIES} from '../../config/keyQueries';

const defaultValues = {
  name: '',
  start_date: null,
  type: 1,
  priority: 0,
  end_date: null,
  status: 0,
};

const ModalTask = ({open, handleClose}) => {
  const queryClient = useQueryClient();
  const {projectId} = useParams();
  const {mutate, isLoading} = useMutation(taskAPI.store, {
    onSuccess: (response) => {
      queryClient.setQueryData(
        [KEY_QUERIES.FETCH_PROJECT, projectId],
        (old) => ({
          ...old,
          tasks: [response, ...old.tasks],
        }),
      );
      reset({...defaultValues});
      handleClose();
    },
    onError: ({response: {data, status}}) => {
      if (status == API_CODES.INVALID_DATA) {
        Object.entries(data.errors).forEach((error) => {
          const [name, message] = error;
          setError(name, {type: 'custom', message: message[0]});
        });
      }
    },
  });
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: {errors},
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    // console.log(data);
    mutate({
      ...data,
      project_id: projectId,
    });
  };

  return (
    <FormDialog
      open={open}
      title={'Create Task'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
      isPending={isLoading}
      formId="form-task"
    >
      <Stack spacing={2}>
        <FormInputText
          control={control}
          name="name"
          label="Name"
          errors={errors}
          fullWidth
        />
        <FormSelect
          control={control}
          name="priority"
          label="Priority"
          fullWidth
          options={TASK_TYPES.map((type, index) => ({
            key: type,
            val: index,
          }))}
        />
        <FormSelect
          control={control}
          name="priority"
          label="Priority"
          fullWidth
          options={TASK_PRIORITIES.map((priority, index) => ({
            key: priority,
            val: index,
          }))}
        />
        <FormSelect
          control={control}
          name="status"
          label="Status"
          fullWidth
          options={TASK_STATUS.map((status, index) => ({
            key: status,
            val: index,
          }))}
        />
        <FormInputDate
          control={control}
          name={'start_date'}
          label="Start Date"
          errors={errors}
        />
        <FormInputDate
          control={control}
          name={'end_date'}
          label="End Date"
          errors={errors}
        />
        <FormTextarea control={control} name="note" placeholder="Note..."/>
      </Stack>
    </FormDialog>
  );
};
export default ModalTask;
