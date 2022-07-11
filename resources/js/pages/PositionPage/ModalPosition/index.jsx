import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as API_CODES from '../../../config/API_CODES';
import { KEY_QUERIES } from '../../../config/keyQueries';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import roleAPI from '../../../services/role';
import { useEffect } from 'react';
import CustomList from './CustomList';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const ModalPosition = ({ handleClose, role, open }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isUpdatePending } = useMutation(roleAPI.update, {
    onSuccess: (response) => {
      handleClose();
      queryClient.setQueryData([KEY_QUERIES.FETCH_ROLE], (old) =>
        old.map((role) => (role.id == response.id ? response : role)),
      );
      toast.success('Role updated successfully');
    },
    onError: ({ response: { data, status } }) => {
      if (status === API_CODES.INVALID_DATA) {
        Object.entries(data.errors).forEach((error) => {
          const [name, message] = error;
          setError(name, { type: 'custom', message: message[0] });
        });
      } else {
        handleClose();
        toast.error(data.message);
      }
    },
  });
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setRight(role.permissions);
  }, [role]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const onSubmit = () => {
    mutate({ id: role.id, permissions: right.map((role) => role.id) });
  };
  const { data, isSuccess } = useQuery([KEY_QUERIES.FETCH_PERMISSION], () =>
    roleAPI.fetchPermissions(),
  );
  useEffect(() => {
    if (isSuccess) {
      setLeft(
        data.filter(
          (r) => role.permissions.map((p) => p.id).indexOf(r.id) === -1,
        ),
      );
    }
  }, [data, isSuccess]);
  return (
    <Dialog
      open={open}
      fullWidth={false}
      maxWidth={'sm'}
      onClose={handleClose}
      disableEscapeKeyDown={true}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Change Permission</Typography>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <CustomList
              items={left}
              checked={checked}
              handleToggle={handleToggle}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
              >
                ≫
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
              >
                &lt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <CustomList
              items={right}
              checked={checked}
              handleToggle={handleToggle}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            color="error"
            onClick={handleClose}
            disabled={isUpdatePending}
          >
            Cancel
          </Button>
          <Button
            color="success"
            type="submit"
            onClick={onSubmit}
            disabled={isUpdatePending}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPosition;
