import { Checkbox, Stack, TextField } from '@mui/material';
import { format, isValid } from 'date-fns';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import FormAutocomplete from '../../components/FormAutocomplete';
import FormDialog from '../../components/FormDialog';
import FormInputDate from '../../components/FormInputDate';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import * as API_CODES from '../../config/API_CODES';
import { PROJECT_PRIORITIES, PROJECT_TYPES } from '../../config/constants';
import { KEY_QUERIES } from '../../config/keyQueries';
import FormTextField from './../../components/FormTextField';
import groupAPI from './../../services/group';
import languageAPI from './../../services/language';
import projectAPI from './../../services/project';

const defaultValues = {
  name: '',
  type: 0,
  priority: 1,
  group_id: '',
  start_date: null,
  end_date: null,
  languages: [],
};
const ModalProject = ({ handleClose, project, keyQuery, action }) => {
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
  const { mutate, isLoading: isStorePending } = useMutation(projectAPI.store, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        [KEY_QUERIES.FETCH_PROJECT, { ...keyQuery }],
        (old) => {
          return [data, ...old];
        },
      );
      handleClose();
      reset({ ...defaultValues });
      toast.success('Project created successfully');
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
    projectAPI.update,
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          [KEY_QUERIES.FETCH_PROJECT, { ...keyQuery }],
          (old) =>
            old.map((oldProject) =>
              oldProject.id === response.id ? response : oldProject,
            ),
        );
        handleClose();
        reset({ ...defaultValues });
        toast.success('Project updated successfully');
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
  const { data, isLoading } = useQuery([KEY_QUERIES.FETCH_GROUP], () =>
    groupAPI.all(),
  );
  const { data: languages, isLoading: isLanguageLoading } = useQuery(
    [KEY_QUERIES.FETCH_LANGUAGE],
    () => languageAPI.all(),
  );

  const onSubmit = (data) => {
    if (action === 'create') {
      mutate({
        ...data,
        start_date: isValid(data.start_date)
          ? format(data.start_date, 'yyyy-MM-dd')
          : null,
        end_date: isValid(data.end_date)
          ? format(data.end_date, 'yyyy-MM-dd')
          : null,
        languages: data.languages.map(({ value }) => value),
      });
    } else {
      updateMutate({
        ...data,
        start_date:
          data.start_date && isValid(new Date(data.start_date))
            ? format(new Date(data.start_date), 'yyyy-MM-dd')
            : null,
        end_date:
          data.end_date && isValid(new Date(data.end_date))
            ? format(new Date(data.end_date), 'yyyy-MM-dd')
            : null,
        languages: data.languages.map(({ value }) => value),
      });
    }
  };
  useEffect(() => {
    if (action === 'edit') {
      project &&
        reset({
          ...project,
          group_id: project.group_id ?? '',
          languages: project.languages.map(({ name, id }) => ({
            label: name,
            value: id,
          })),
        });
    } else {
      reset({ ...defaultValues });
    }
  }, [project, reset]);

  const handleCloseForm = useCallback(() => {
    reset({ ...defaultValues });
    handleClose();
  }, []);
  return (
    <FormDialog
      title={action === 'edit' ? 'Edit Project' : 'Create Project'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleCloseForm}
      open={!!action}
      isLoading={isLoading || isLanguageLoading}
      isPending={isStorePending || isUpdatePending}
      formId="form-project"
    >
      <Stack spacing={2}>
        <FormTextField
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
        <FormAutocomplete
          control={control}
          name="languages"
          multiple
          isOptionEqualToValue={(option, value) => option.value == value.value}
          getOptionLabel={(option) => option.label}
          options={
            languages?.map(({ name, id }) => ({
              label: name,
              value: id,
            })) ?? []
          }
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Language'}
              placeholder={'Choose languages'}
              variant="outlined"
              fullWidth
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        <FormSelect
          control={control}
          name="group_id"
          label="Group"
          fullWidth
          options={
            data?.map(({ name, id, division }) => ({
              key: `${name} - ${division.name}`,
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
