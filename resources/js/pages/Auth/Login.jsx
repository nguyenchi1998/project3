import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from 'joi';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { signIn } from '../../services/auth';
import FormInputText from '../../components/FormInputText';
import { PATH } from '../../routes/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    padding: theme.spacing(8),
  },
  wrap: {
    backgroundColor: 'white',
    borderRadius: 10,
    maxWidth: 500,
    margin: 'auto',
    padding: theme.spacing(4),
  },
  btnLogin: {
    borderRadius: 4,
    fontWeight: 'bold',
  },
  signUpWrap: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
}));
const defaultValues = {
  email: 'admin@gmail.com',
  password: 'password',
};
const schema = joi
  .object({
    email: joi.string().required(),
    password: joi.string().required(),
  })
  .required();

const LoginPage = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });
  const onSubmit = async (credential) => {
    setIsLoading(true);
    signIn(credential)
      .then(() => {
        setIsLoading(false);
        history.push(PATH.HOME_PAGE);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setErrorMessage(message);
        },
      );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.wrap}>
        <Typography variant="h2" component="div">
          <Box fontWeight="bold" textAlign="center">
            Login
          </Box>
        </Typography>
        <Box sx={{ height: 25 }}>
          <Typography align="center" color="error">
            {errorMessage}
          </Typography>
        </Box>
        <Box padding={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormInputText
                control={control}
                name="email"
                label="Email"
                error={errors.email}
              />
              <FormInputText
                type="password"
                control={control}
                name="password"
                label="Password"
                error={errors.password}
              />
              <LoadingButton
                fullWidth
                loading={isLoading}
                type="submit"
                loadingIndicator="Login..."
                variant="contained"
                className={classes.btnLogin}
              >
                Login
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
