import React, { useCallback, useContext } from 'react';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
  PROGRESS_PERCENT,
} from '../../config/constants';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import trackerAPI from './../../services/tracker';
import { DesktopDatePicker } from '@mui/lab';
import { isValid } from 'date-fns';
import { format } from 'date-fns/esm';
import { ProjectContext } from '../../layouts/project';

const Filter = ({ totalFilter, onChangeTotalFilter, filterOpen }) => {
  const projectId = useContext(ProjectContext);
  const { data: members, isLoading: isMembersLoading } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId],
    () => projectAPI.getMembers({ projectId }),
  );
  const { data: trackers, isLoading: isTrackersLoading } = useQuery(
    [KEY_QUERIES.FETCH_TRACKER],
    () => trackerAPI.all(),
  );
  const handleChange = useCallback(({ target: { name, value } }) => {
    onChangeTotalFilter({ [name]: value });
  }, []);
  const handleChangeAutocomplete = useCallback((_, value, name) => {
    onChangeTotalFilter({ [name]: value?.id });
  }, []);
  const handleChangeMultiAutocomplete = useCallback((_, value, name) => {
    onChangeTotalFilter({
      [name]: value.map(({ value }) => value),
    });
  }, []);
  const onChangeDate = useCallback((value, name) => {
    onChangeTotalFilter({
      [name]: isValid(value) ? format(new Date(value), 'yyyy-MM-dd') : null,
    });
  }, []);

  return (
    <Box>
      {filterOpen && (
        <Box minWidth={200} py={1} pl={2}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <TextField
                label="Name"
                name="name"
                value={totalFilter?.name}
                onChange={handleChange}
              />
            </FormControl>
            <Autocomplete
              multiple
              onChange={(e, value) =>
                handleChangeMultiAutocomplete(e, value, 'status')
              }
              value={ISSUE_STATUS.filter(({ value }) =>
                totalFilter.status.includes(value),
              )}
              options={ISSUE_STATUS}
              isOptionEqualToValue={(option, value) =>
                value.value === option.value
              }
              limitTags={1}
              getOptionLabel={(option) => option.key ?? ''}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={totalFilter.priority}
                label="Priority"
                onChange={handleChange}
                name="priority"
              >
                <MenuItem value="all">All</MenuItem>
                {ISSUE_PRIORITIES.map((priority, index) => (
                  <MenuItem value={index} key={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Percent Done</InputLabel>
              <Select
                value={totalFilter.percent}
                label="Progress Percent"
                onChange={handleChange}
                name="percent"
              >
                <MenuItem value="all">All</MenuItem>
                {PROGRESS_PERCENT.map((percent, index) => (
                  <MenuItem value={percent} key={percent}>
                    {`${percent}%`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <DesktopDatePicker
                clearable
                onChange={(e) => onChangeDate(e, 'startDate')}
                label="Start Date"
                value={totalFilter.startDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
            <FormControl>
              <DesktopDatePicker
                clearable
                onChange={(e) => onChangeDate(e, 'dueDate')}
                label="Due Date"
                value={totalFilter.dueDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
            <Autocomplete
              onChange={(e, value) =>
                handleChangeAutocomplete(e, value, 'authorId')
              }
              value={
                members?.find(
                  (member) => member.id === totalFilter?.authorId,
                ) ?? null
              }
              options={members ?? []}
              loading={isMembersLoading}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option?.name ?? ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Author"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isMembersLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <Autocomplete
              onChange={(e, value) =>
                handleChangeAutocomplete(e, value, 'assigneeId')
              }
              value={
                members?.find(
                  (member) => member.id === totalFilter?.assigneeId,
                ) ?? null
              }
              options={members ?? []}
              loading={isMembersLoading}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option?.name ?? ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Assignee"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isMembersLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <Autocomplete
              onChange={(e, value) =>
                handleChangeAutocomplete(e, value, 'trackerId')
              }
              value={
                trackers?.find(
                  (tracker) => tracker.id === totalFilter?.trackerId,
                ) ?? null
              }
              options={trackers ?? []}
              loading={isTrackersLoading}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option?.name ?? ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tracker"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isTrackersLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Filter;
