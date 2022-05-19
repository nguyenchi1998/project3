import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import {
  Autocomplete,
  Box,
  DialogContent,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { POSITIONS, PROJECT_MEMBER_ROLES } from '../../config/constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { AddCircleOutlineOutlined, SearchOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import CancelIcon from '@mui/icons-material/Cancel';
import { KEY_QUERIES } from '../../config/keyQueries';
import { useMutation, useQuery } from 'react-query';
import userAPI from '../../services/user';
import FormDialog from '../../components/FormDialog';
import FormAutocomplete from '../../components/FormAutocomplete';
import projectAPI from './../../services/project';
import { useForm } from 'react-hook-form';

const MemberItem = ({ member }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem divider sx={{ py: 0.5, px: 0 }}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={member.name} secondary={member.email} />
      <Box display={'flex'} alignItems="center">
        <Box>{PROJECT_MEMBER_ROLES[member.pivot.role]}</Box>
        <Button id="basic-button" onClick={handleClick}>
          <SettingsIcon fontSize="small" />
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </ListItem>
  );
};

const ModalMember = ({ open, handleClose, project }) => {
  const { mutate, isLoading: isAddMemberPending } = useMutation(
    projectAPI.addMember,
    {
      onSuccess: () => {
        toast.success('Project add member successfully');
      },
      onError: ({ response: { data, status } }) => {},
    },
  );
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const { data, isLoading } = useQuery([KEY_QUERIES.FETCH_USER], () =>
    userAPI.all(),
  );
  const onSubmit = (data) => {
    console.log(data);
    // mutate({});
  };
  return (
    <FormDialog
      title={'Employee Invitation'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm"
      isLoading={isLoading}
      isPending={isAddMemberPending}
      formId="form-members"
    >
      <Box display="flex" justifyContent={'space-between'}>
        <Box flexGrow={1} display="flex" justifyContent={'flex-start'}>
          <FormAutocomplete
            control={control}
            name="members"
            sx={{ flexGrow: 1 }}
            multiple
            limitTags={2}
            fullWidth
            getOptionLabel={(option) => `${option.name}`}
            loading={isLoading}
            options={data?.map(({ id, name }) => ({ id, name })) ?? []}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option, { selected }) => (
              <Box
                {...props}
                width="100%"
                display="flex"
                justifyContent={'space-between'}
                alignItems="center"
              >
                <Box flexGrow={1}>
                  <Box
                    display={'flex'}
                    justifyContent="flex-start"
                    alignItems={'center'}
                  >
                    <Typography variant="subtitle1" component={Box}>
                      {option.name}
                    </Typography>
                    <Box ml={1}>
                      {!!option.position && (
                        <Box borderRadius={2} px={0.5} bgcolor="pink">
                          <Typography variant="body2">
                            {POSITIONS[option.position]}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="subtitle2">{option.email}</Typography>
                </Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <Button>Add</Button>
        </Box>
      </Box>
      <Typography component={Box} sx={{ paddingY: 1 }} variant="h6">
        Members
      </Typography>
      <List>
        {project?.members.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </List>
    </FormDialog>
  );
};

export default ModalMember;
