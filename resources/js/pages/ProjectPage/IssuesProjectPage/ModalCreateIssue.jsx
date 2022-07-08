import { Box, Grid, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormDialog from '../../../components/FormDialog';
import FormInputDate from '../../../components/FormInputDate';
import FormTextField from '../../../components/FormTextField';
import FormSelect from '../../../components/FormSelect';
import FormAutocomplete from '../../../components/FormAutocomplete';
import FormTextarea from '../../../components/FormTextarea';
import { ISSUE_PRIORITIES, ISSUE_STATUS } from '../../../config/constants';
import * as API_CODES from '../../../config/API_CODES';
import issueAPI from '../../../services/issue';
import { KEY_QUERIES } from '../../../config/keyQueries';
import projectAPI from '../../../services/project';
import trackerAPI from '../../../services/tracker';
import { format, isValid } from 'date-fns';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ProjectContext } from '../../../layouts/project';

const defaultValues = {
  name: '',
  start_date: null,
  tracker_id: 2,
  priority: 1,
  due_date: null,
  status: 1,
  target_version_id: '',
  assign_user_id: null,
  estimate_time: '',
  description: '',
};

const ModalCreateIssue = ({ open, handleClose, debounceFilter }) => {
  const projectId = useContext(ProjectContext);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(issueAPI.store, {
    onSuccess: (response) => {
      queryClient.setQueryData(
        [KEY_QUERIES.FETCH_PROJECT_ISSUE, projectId, { ...debounceFilter }],
        (old) => {
          return [response, ...old];
        },
      );
      handleClose();
      reset({ ...defaultValues });
      toast.success('Create issue successfully');
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
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    mutate({
      ...data,
      start_date:
        data.start_date && isValid(data.start_date)
          ? format(new Date(data.start_date), 'yyyy-MM-dd')
          : null,
      due_date:
        data.due_date && isValid(data.due_date)
          ? format(new Date(data.due_date), 'yyyy-MM-dd')
          : null,
      assign_user_id: data?.assign_user_id?.id,
      project_id: projectId,
    });
  };
  const { data, isLoading: isMembersLoading } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId],
    () => projectAPI.getMembers({ projectId }),
  );
  const { data: trackers, isLoading: isTrackersLoading } = useQuery(
    [KEY_QUERIES.FETCH_TRACKER, projectId],
    () => trackerAPI.all({ projectId }),
  );
  const {
    data: targetVersions,
    isLoading: isTargetVersionsLoading,
  } = useQuery([KEY_QUERIES.FETCH_TRACKER, projectId], () =>
    projectAPI.getTargetVersions({ projectId }),
  );

  return (
    <FormDialog
      open={open}
      title="New Issue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
      isPending={isLoading}
      formId="form-issue"
      maxWidth="md"
      isLoading={isMembersLoading || isTrackersLoading}
    >
      <Stack spacing={2}>
        <FormTextField
          control={control}
          name="name"
          label="Name"
          errors={errors}
          fullWidth
        />
        <FormTextarea
          control={control}
          name="description"
          placeholder="Description..."
          label="Description"
        />
        <Grid container>
          <Grid item xs={6}>
            <Box pr={1}>
              <FormAutocomplete
                control={control}
                name="assign_user_id"
                sx={{ flexGrow: 1 }}
                disableCloseOnSelect={false}
                getOptionLabel={(option) => `${option.name}`}
                options={data?.map(({ id, name }) => ({ id, name }))}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Assignee" />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box pl={1}>
              <FormSelect
                control={control}
                name="target_version_id"
                label="Target Version"
                fullWidth
                options={targetVersions?.map((targetVersion) => ({
                  key: targetVersion.name,
                  val: targetVersion.id,
                }))}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Box pr={1}>
              <FormSelect
                control={control}
                name="priority"
                label="Priority"
                fullWidth
                options={ISSUE_PRIORITIES.map(({ label, value }) => ({
                  key: label,
                  val: value,
                }))}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box pl={1}>
              <FormSelect
                control={control}
                name="tracker_id"
                label="Tracker"
                fullWidth
                options={trackers?.map((tracker) => ({
                  key: tracker.name,
                  val: tracker.id,
                }))}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Box pr={1}>
              <FormSelect
                control={control}
                name="status"
                label="Status"
                fullWidth
                options={ISSUE_STATUS.map(({ label, value }) => ({
                  key: label,
                  val: value,
                }))}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box pl={1}>
              <FormTextField
                control={control}
                name="estimate_time"
                label="Estimate Time"
                type="number"
                errors={errors}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Box pr={1}>
              <FormInputDate
                fullWidth
                control={control}
                name="start_date"
                label="Start Date"
                errors={errors}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box pl={1}>
              <FormInputDate
                fullWidth
                control={control}
                name="due_date"
                label="Due Date"
                errors={errors}
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </FormDialog>
  );
};
export default ModalCreateIssue;
