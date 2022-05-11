import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { PROJECT_MEMBER_ROLE } from '../../config/constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';

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
    <ListItem divider>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={member.name} secondary={member.email} />
      <Box display={'flex'} alignItems="center">
        <Box>{PROJECT_MEMBER_ROLE[member.pivot.role]}</Box>
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
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Project member</DialogTitle>
      <Box px={2}>
        <OutlinedInput
          fullWidth
          placeholder="Search member"
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
      <List sx={{ pt: 0 }}>
        {project.members.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </List>
    </Dialog>
  );
};

export default ModalMember;
