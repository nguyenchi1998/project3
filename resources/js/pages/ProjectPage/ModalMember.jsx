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
  Box,
  DialogContent,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import { PROJECT_MEMBER_ROLES } from '../../config/constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import CancelIcon from '@mui/icons-material/Cancel';

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
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <Box position="absolute" top={8} right={4}>
        <IconButton onClick={handleClose}>
          <CancelIcon />
        </IconButton>
      </Box>
      <DialogTitle>Member Invitation</DialogTitle>
      <Box px={3}>
        <OutlinedInput
          fullWidth
          placeholder="Employee email"
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
      <DialogTitle sx={{ paddingY: 1 }}>Members</DialogTitle>
      <DialogContent>
        <List>
          {project.members.map((member) => (
            <MemberItem key={member.id} member={member} />
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMember;
