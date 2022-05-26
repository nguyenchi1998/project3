import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { POSITIONS, PROJECT_MEMBER_ROLES } from '../../config/constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { KEY_QUERIES } from '../../config/keyQueries';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormDialog from '../../components/FormDialog';
import FormAutocomplete from '../../components/FormAutocomplete';
import projectAPI from './../../services/project';
import employeeAPI from './../../services/employee';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const MemberItem = ({ member, projectId }) => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutate } = useMutation(projectAPI.removeMember, {
    onSuccess: () => {
      queryClient.setQueryData([KEY_QUERIES.FETCH_PROJECT], (old) => {
        return old.map((project) =>
          project.id === projectId
            ? {
                ...project,
                members: project.members.filter(
                  (oldMember) => oldMember.id != member.id,
                ),
              }
            : project,
        );
      });
      queryClient.setQueryData(
        [KEY_QUERIES.FETCH_PROJECT, projectId],
        (old) => {
          return {
            ...old,
            members: old.members.filter(
              (oldMember) => oldMember.id != member.id,
            ),
          };
        },
      );
      handleClose();
      toast.success('Project add member successfully');
    },
    onError: ({}) => {},
  });
  const handleRemoveMember = () => {
    mutate({
      id: projectId,
      memberId: member.id,
    });
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
          <MenuItem onClick={handleRemoveMember}>Remove Member</MenuItem>
        </Menu>
      </Box>
    </ListItem>
  );
};

const ModalMember = ({ open, handleClose, project }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isAddMemberPending } = useMutation(
    projectAPI.addMember,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([KEY_QUERIES.FETCH_PROJECT, project.id]);
        toast.success('Project add member successfully');
      },
      onError: ({}) => {},
    },
  );
  const { handleSubmit, control } = useForm({
    defaultValues: {
      employees: [],
    },
  });
  const { data, isLoading } = useQuery(
    [KEY_QUERIES.FETCH_PROJECT, project.id],
    () => projectAPI.find(project.id),
  );
  const { data: employees, isLoading: isEmployeeLoading } = useQuery(
    [KEY_QUERIES.FETCH_EMPLOYEE],
    () => employeeAPI.all(),
  );
  const onSubmit = ({ employees }) => {
    mutate({
      id: project.id,
      employeeIds: employees.map((employee) => employee.id),
    });
  };
  return (
    <FormDialog
      title={'Employee Invitation'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="sm"
      isLoading={isLoading || isEmployeeLoading}
      isPending={isAddMemberPending}
      formId="form-members"
      actionButtonShow={false}
    >
      <Box display="flex" justifyContent={'space-between'}>
        <Box flexGrow={1} display="flex" justifyContent={'flex-start'}>
          <FormAutocomplete
            control={control}
            name="employees"
            sx={{ flexGrow: 1 }}
            multiple
            limitTags={1}
            getOptionLabel={(option) => `${option.name}`}
            options={
              employees
                ?.filter(
                  ({ id }) =>
                    !data?.members.map((member) => member.id).includes(id),
                )
                ?.map(({ id, name }) => ({ id, name })) ?? []
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => (
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
          />
          <Box>
            <Button type="submit" variant="outlined">
              Add
            </Button>
          </Box>
        </Box>
      </Box>
      <Typography component={Box} sx={{ paddingY: 1 }} variant="h6">
        Members
      </Typography>
      <List>
        {project?.members.map((member) => (
          <MemberItem key={member.id} member={member} projectId={project.id} />
        ))}
      </List>
    </FormDialog>
  );
};

export default ModalMember;
