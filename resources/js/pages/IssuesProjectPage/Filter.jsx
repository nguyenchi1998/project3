import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { KEY_QUERIES } from '../../config/keyQueries';
import projectAPI from '../../services/project';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {
  Button,
  colors,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
  PAGINATE_LIMIT,
} from '../../config/constants';
import { format } from 'date-fns';
import ModalIssue from './ModalIssue';
import { PATH, PROJECT_PATH } from '../../routes/paths';
import { ISSUE_PRIORITY_COLORS } from '../../config/constants';
import { useTheme } from '@emotion/react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import trackerAPI from './../../services/tracker';

const Filter = ({ projectId, filter, onChangeFilter }) => {
  const { data: members, isLoading: isMembersLoading } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT_MEMBER, projectId],
    () => projectAPI.getMembers(projectId),
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

  return (
    <Box pl={2} minWidth={300}>
      <Box
        py={2}
        display="flex"
        justifyContent="space-between"
        alginItems="center"
      >
        <Typography flexGrow={1} variant="h6" component={Box}>
          Filter
        </Typography>
        <IconButton>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      </Box>
      <Stack spacing={2}>
        <FormControl fullWidth>
          <TextField
            label="Keyword"
            name="keyword"
            value={filter?.keyword}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter.status}
            label="status"
            onChange={handleChange}
            name="status"
          >
            {ISSUE_STATUS.map((status, index) => (
              <MenuItem value={index} key={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filter.priority}
            label="Priority"
            onChange={handleChange}
            name="priority"
          >
            {ISSUE_PRIORITIES.map((priority, index) => (
              <MenuItem value={index} key={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          onChange={(e, value) =>
            handleChangeAutocomplete(e, value, 'assigneeId')
          }
          value={
            members?.find((member) => member.id == filter?.assigneeId) ?? null
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
          onChange={(e, value) =>
            handleChangeAutocomplete(e, value, 'trackerId')
          }
          value={
            trackers?.find((tracker) => tracker.id == filter?.trackerId) ?? null
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
  );
};

export default Filter;
