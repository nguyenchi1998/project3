import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';

const CustomList = ({ items, checked, handleToggle }) => {
  return (
    <Paper
      sx={{ width: 200, height: 280, overflow: 'auto' }}
      variant="outlined"
    >
      <List dense component="div" role="list">
        {items.map((value) => (
          <ListItem
            key={value.id}
            role="listitem"
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={value.name} />
          </ListItem>
        ))}
        <ListItem />
      </List>
    </Paper>
  );
};

export default CustomList;
