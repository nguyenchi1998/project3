import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Box } from '@mui/system';
import { format, isValid } from 'date-fns';
import { date } from 'joi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormDialog from '../../components/FormDialog';
import FormInputDate from '../../components/FormInputDate';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import { PROJECT_PRIORITIES, PROJECT_TYPES } from '../../config/constants';
import { KEY_QUERIES } from '../../config/keyQueries';
import FormInputText from './../../components/FormInputText';
import groupAPI from './../../services/group';
import projectAPI from './../../services/project';

const defaultValues = {
  name: '',
  type: 0,
  priority: 1,
  group_id: '',
  start_date: null,
  end_date: null,
};

const ModalProject = ({ handleCloseForm, project, keyword, type, action }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(projectAPI.store, {
    onSuccess: () => {
      queryClient.invalidateQueries([KEY_QUERIES.FETCH_PROJECT, keyword, type]);
      handleClose();
    },
  });
  const { data, isLoading, isError } = useQuery([KEY_QUERIES.FETCH_GROUP], () =>
    groupAPI.all(),
  );
  const {
    handleSubmit,
    register,
    control,
    reset,
    setError,
    formState: { errors },
    ...methods
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        start_date: isValid(data.start_date)
          ? format(data.start_date, 'yyyy-MM-dd')
          : null,
        end_date: isValid(data.end_date)
          ? format(data.end_date, 'yyyy-MM-dd')
          : null,
      },
      {},
    );
  };
  useEffect(() => {
    if (action === 'edit') {
      project &&
        reset({
          ...project,
          group_id: project.group_id ?? '',
        });
    } else {
      reset({ ...defaultValues });
    }
  }, [project, reset]);

  const handleClose = () => {
    reset({ ...defaultValues });
    handleCloseForm();
  };
  return (
    <FormDialog
      title={action === 'edit' ? 'Edit Project' : 'Create Project'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
      open={!!action}
      fullWidth
      maxWidth="sm"
      isLoading={isLoading}
    >
      <Stack spacing={3}>
        <FormInputText
          control={control}
          name="name"
          label="Name"
          errors={errors}
          fullWidth
        />
        <FormSelect
          control={control}
          name="type"
          label="Type"
          fullWidth
          options={PROJECT_TYPES.map((type, index) => ({
            key: type,
            val: index,
          }))}
        />
        <FormInputDate
          control={control}
          minDate={new Date()}
          name={'start_date'}
          label="Start Date"
        />
        <FormInputDate
          control={control}
          minDate={new Date()}
          name={'end_date'}
          label="End Date"
        />
        <FormSelect
          control={control}
          name="priority"
          label="Priority"
          fullWidth
          options={PROJECT_PRIORITIES.map((priority, index) => ({
            key: priority,
            val: index,
          }))}
        />
        <FormSelect
          control={control}
          name="group_id"
          label="Group"
          fullWidth
          options={
            data?.map(({ name, id }) => ({
              key: name,
              val: id,
            })) ?? []
          }
        />
        <FormTextarea control={control} name="group" placeholder="Note" />
      </Stack>
    </FormDialog>
  );
};

export default ModalProject;
