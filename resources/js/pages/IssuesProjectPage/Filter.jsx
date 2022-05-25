import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
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

const Filter = ({ projectId, filter, onChangeFilter }) => {
  const [filterOpen, setFilterOpen] = useState(true);
  const { data: members, isLoading: isMembersLoading } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId],
    () => projectAPI.getMembers({ projectId }),
  );
  const { data: trackers, isLoading: isTrackersLoading } = useQuery(
    [KEY_QUERIES.FETCH_TRACKER],
    () => trackerAPI.all(),
  );
  const handleChange = ({ target: { name, value } }) => {
    onChangeFilter({ [name]: value });
  };
  const handleChangeAutocomplete = (_, value, name) => {
    onChangeFilter({ [name]: value?.id });
  };
  const handleToggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const onChangeDate = (value, name) => {
    onChangeFilter({
      [name]: isValid(value) ? format(new Date(value), 'yyyy-MM-dd') : null,
    });
  };
  return (
    <Box pl={2}>
      {filterOpen ? (
        <Box minWidth={200} py={1}>
          <Box
            py={1}
            display="flex"
            justifyContent="space-between"
            alginItems="center"
          >
            <Typography flexGrow={1} variant="h6">
              Filter
            </Typography>
            <Button onClick={handleToggleFilter} variant="contained">
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </Box>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Name"
                name="name"
                value={filter?.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filter.status}
                label="status"
                onChange={handleChange}
                name="status"
              >
                <MenuItem value="all">All</MenuItem>
                {ISSUE_STATUS.map((status, index) => (
                  <MenuItem value={index} key={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={filter.priority}
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
            <FormControl fullWidth size="small">
              <InputLabel>Percent Done</InputLabel>
              <Select
                value={filter.percent}
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
                value={filter.startDate}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </FormControl>
            <FormControl>
              <DesktopDatePicker
                clearable
                size="small"
                onChange={(e) => onChangeDate(e, 'endDate')}
                label="End Date"
                value={filter.endDate}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </FormControl>
            <Autocomplete
              size="small"
              onChange={(e, value) =>
                handleChangeAutocomplete(e, value, 'authorId')
              }
              value={
                members?.find((member) => member.id == filter?.authorId) ?? null
              }
              options={members ?? []}
              loading={isMembersLoading}
              isOptionEqualToValue={(option, value) => option.id == value.id}
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
              size="small"
              onChange={(e, value) =>
                handleChangeAutocomplete(e, value, 'assigneeId')
              }
              value={
                members?.find((member) => member.id == filter?.assigneeId) ??
                null
              }
              options={members ?? []}
              loading={isMembersLoading}
              isOptionEqualToValue={(option, value) => option.id == value.id}
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
              size="small"
              onChange={(e, value) =>
                handleChangeAutocomplete(e, value, 'trackerId')
              }
              value={
                trackers?.find((tracker) => tracker.id == filter?.trackerId) ??
                null
              }
              options={trackers ?? []}
              loading={isTrackersLoading}
              isOptionEqualToValue={(option, value) => option.id == value.id}
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
      ) : (
        <Box py={2}>
          <Button onClick={handleToggleFilter} variant="contained">
            <KeyboardDoubleArrowLeftIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Filter;
