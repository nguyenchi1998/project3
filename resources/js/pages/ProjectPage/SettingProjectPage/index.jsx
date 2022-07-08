import {
  Box,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import FormAutocomplete from '../../../components/FormAutocomplete';
import FormInputDate from '../../../components/FormInputDate';
import FormSelect from '../../../components/FormSelect';
import FormTextarea from '../../../components/FormTextarea';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormTextField from '../../../components/FormTextField';
import { useForm } from 'react-hook-form';
import { PROJECT_PRIORITIES, PROJECT_TYPES } from '../../../config/constants';
import { toast } from 'react-toastify';
import * as API_CODES from '../../../config/API_CODES';
import { format, isValid } from 'date-fns';
import groupAPI from '../../../services/group';
import languageAPI from '../../../services/language';
import { useContext } from 'react';
import { ProjectContext } from '../../../layouts/project';

const defaultValues = {
  name: '',
  type: 0,
  priority: 1,
  group_id: '',
  start_date: null,
  due_date: null,
  languages: [],
};
const SettingProjectPage = () => {
  const projectId = useContext(ProjectContext);
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { mutate: updateMutate, isLoading: isUpdatePending } = useMutation(
    projectAPI.update,
    {
      onSuccess: (response) => {
        queryClient.setQueryData([KEY_QUERIES.FETCH_PROJECT], (old) =>
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
  const onSubmit = (data) => {
    updateMutate({
      ...data,
      start_date:
        data.start_date && isValid(new Date(data.start_date))
          ? format(new Date(data.start_date), 'yyyy-MM-dd')
          : null,
      due_date:
        data.due_date && isValid(new Date(data.due_date))
          ? format(new Date(data.due_date), 'yyyy-MM-dd')
          : null,
      languages: data.languages.map(({ value }) => value),
    });
  };
  const { data, isLoading, isError, error } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, projectId],
    () => projectAPI.find(projectId),
  );
  const { data: groups, isLoading: isGroupLoading } = useQuery(
    [KEY_QUERIES.FETCH_GROUP],
    () => groupAPI.all(),
  );
  const { data: languages, isLoading: isLanguageLoading } = useQuery(
    [KEY_QUERIES.FETCH_LANGUAGE],
    () => languageAPI.all(),
  );
  if (isLoading) {
    <Typography variant="h5">Loading</Typography>;
  }
  if (isError) {
    <Typography variant="h5">{error.message}</Typography>;
  }

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">Setting</Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              options={PROJECT_TYPES.map(({ label, value }) => ({
                key: label,
                val: value,
              }))}
            />
            <FormInputDate
              control={control}
              minDate={new Date()}
              name="start_date"
              label="Start Date"
            />
            <FormInputDate
              control={control}
              minDate={new Date()}
              name="due_date"
              label="Due Date"
            />
            <FormSelect
              control={control}
              name="priority"
              label="Priority"
              fullWidth
              options={PROJECT_PRIORITIES.map(({ label, value }) => ({
                key: label,
                val: value,
              }))}
            />
            <FormAutocomplete
              loading={isLoading}
              control={control}
              name="languages"
              multiple
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
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
                  label="Language"
                  placeholder="Choose languages"
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
                groups?.map(({ name, id, division }) => ({
                  key: `${name} - ${division.name}`,
                  val: id,
                })) ?? []
              }
            />
            <FormTextarea control={control} name="group" placeholder="Note" />
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default SettingProjectPage;
