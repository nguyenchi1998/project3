import { Stack, TextField, Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormDialog from '../../components/FormDialog';
import FormInputDate from '../../components/FormInputDate';
import { useParams } from 'react-router-dom';
import FormTextField from '../../components/FormTextField';
import FormSelect from '../../components/FormSelect';
import FormAutocomplete from '../../components/FormAutocomplete';
import FormTextarea from '../../components/FormTextarea';
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
  PROGRESS_PERCENT,
} from '../../config/constants';
import * as API_CODES from '../../config/API_CODES';
import issueAPI from '../../services/issue';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import trackerAPI from '../../services/tracker';
import { format, isValid } from 'date-fns';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const defaultValues = {
  name: '',
  start_date: null,
  tracker_id: 2,
  priority: 0,
  end_date: null,
  status: 0,
  assign_user_id: null,
  estimate_time: 0,
  parent_issue_id: null,
  progress_percent: 0,
};

const ModalSubIssue = ({ open, handleClose, issue }) => {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const { mutate, isLoading } = useMutation(issueAPI.store, {
    onSuccess: (response) => {
      queryClient.setQueryData(
        [KEY_QUERIES.FETCH_PROJECT_ISSUE, projectId],
        (old) => {
          return [response, ...old];
        },
      );
      handleClose();
      reset({ ...defaultValues });
      toast.success('Add sub issue successfully');
    },
    onError: ({ response: { data, status } }) => {
      if (status == API_CODES.INVALID_DATA) {
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
  useEffect(() => {
    reset({ ...defaultValues, parent_issue_id: issue });
  }, [issue]);
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
          ? format(new Date(data.start_date), 'yyyy/MM/dd')
          : null,
      end_date:
        data.end_date && isValid(data.end_date)
          ? format(new Date(data.end_date), 'yyyy/MM/dd')
          : null,
      assign_user_id: data.assign_user_id.id,
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
  const { data: issues, isLoading: isIssuesLoading } = useQuery(
    [KEY_QUERIES.FETCH_PARENT_ISSUE, projectId],
    () => projectAPI.getIssues({ projectId }),
  );
  return (
    <FormDialog
      open={open}
      title={'New Issue'}
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
          name="note"
          placeholder="Description..."
          label={'Description'}
        />
        <FormAutocomplete
          control={control}
          name="assign_user_id"
          sx={{ flexGrow: 1 }}
          disableCloseOnSelect={false}
          getOptionLabel={(option) => `${option.name}`}
          options={data?.map(({ id, name }) => ({ id, name }))}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Assignee" />}
        />
        <Grid container>
          <Grid item xs={6}>
            <Box pr={1}>
              <FormSelect
                control={control}
                name="priority"
                label="Priority"
                fullWidth
                options={ISSUE_PRIORITIES.map((priority, index) => ({
                  key: priority,
                  val: index,
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
                options={ISSUE_STATUS.map((status, index) => ({
                  key: status,
                  val: index,
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
                name={'start_date'}
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
                name={'end_date'}
                label="End Date"
                errors={errors}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Box pr={1}>
              <FormSelect
                control={control}
                name="progress_percent"
                label="Progress Percent"
                fullWidth
                options={PROGRESS_PERCENT.map((percent) => ({
                  key: `${percent}%`,
                  val: percent,
                }))}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box pl={1}>
              <FormAutocomplete
                control={control}
                name="parent_issue_id"
                disableCloseOnSelect={false}
                getOptionLabel={(option) => `Issue #${option.id}`}
                options={(issues ?? [])?.map(({ id, name }) => ({ id, name }))}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Parent Issue" />
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </FormDialog>
  );
};
export default ModalSubIssue;
