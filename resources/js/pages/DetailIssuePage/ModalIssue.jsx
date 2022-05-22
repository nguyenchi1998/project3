import { Box, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormDialog from '../../components/FormDialog';
import FormInputDate from '../../components/FormInputDate';
import { useParams } from 'react-router-dom';
import FormInputText from '../../components/FormInputText';
import FormSelect from '../../components/FormSelect';
import FormAutocomplete from '../../components/FormAutocomplete';
import FormTextarea from '../../components/FormTextarea';
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
  ISSUE_TYPES,
  PROGRESS_PERCENT,
} from '../../config/constants';
import * as API_CODES from '../../config/API_CODES';
import taskAPI from '../../services/issue';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from './../../services/project';
import trackerAPI from './../../services/tracker';
import issueAPI from './../../services/issue';
import { format, isValid } from 'date-fns';
import { useEffect } from 'react';

const defaultValues = {
  name: '',
  start_date: null,
  tracker_id: 2,
  priority: 0,
  end_date: null,
  status: 0,
  assign_user_id: null,
  progress_percent: 0,
  estimate_time: 0,
};

const ModalIssue = ({ issueId, handleClose }) => {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const { mutate, isLoading } = useMutation(taskAPI.update, {
    onSuccess: (response) => {
      queryClient.setQueryData([KEY_QUERIES.FETCH_ISSUE, issueId], (old) => ({
        ...old,
        ...response,
      }));
      reset({ ...defaultValues });
      handleClose();
    },
    onError: ({ response: { data, status } }) => {
      if (status == API_CODES.INVALID_DATA) {
        Object.entries(data.errors).forEach((error) => {
          const [name, message] = error;
          setError(name, { type: 'custom', message: message[0] });
        });
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
          ? format(new Date(data.start_date), 'yyyy/MM/dd')
          : null,
      end_date:
        data.end_date && isValid(data.end_date)
          ? format(new Date(data.end_date), 'yyyy/MM/dd')
          : null,
      id: issueId,
      assign_user_id: data?.assign_user_id?.id,
    });
  };
  const { data, isLoading: isMembersLoading } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId],
    () => projectAPI.getMembers(projectId),
  );
  const { data: trackers, isLoading: isTrackersLoading } = useQuery(
    [KEY_QUERIES.FETCH_TRACKER, projectId],
    () => trackerAPI.all({ projectId }),
  );
  const {
    data: issue,
    isLoading: isIssueLoading,
    isSuccess: isIssueSuccess,
  } = useQuery([KEY_QUERIES.FETCH_ISSUE, issueId], () =>
    issueAPI.find(issueId),
  );

  useEffect(() => {
    if (isIssueSuccess && issue) {
      const {
        name,
        start_date,
        tracker_id,
        priority,
        end_date,
        status,
        assignee,
        progress_percent,
        estimate_time,
        description,
      } = issue;
      reset({
        name,
        start_date,
        tracker_id,
        priority,
        end_date,
        status,
        assign_user_id: assignee,
        progress_percent,
        estimate_time: estimate_time ?? 0,
        description,
      });
    }
  }, [isIssueSuccess, issue]);

  return (
    <FormDialog
      open={!!issueId}
      title={'Edit Issue'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
      isPending={isLoading}
      formId="form-issue"
      maxWidth="md"
      isLoading={isMembersLoading || isTrackersLoading || isIssueLoading}
    >
      <Stack spacing={2}>
        <FormInputText
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
        />
        <FormSelect
          control={control}
          name="tracker_id"
          label="Tracker"
          fullWidth
          options={trackers?.map((tracker) => ({
            key: tracker?.name,
            val: tracker?.id,
          }))}
        />
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
        <FormInputText
          control={control}
          name="estimate_time"
          label="Estimate Time"
          type="number"
          errors={errors}
          fullWidth
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
      </Stack>
    </FormDialog>
  );
};
export default ModalIssue;
