import React from 'react';
import axios from '../axios';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, Context } from '../authContext';

export default function LoginPage () {
  const [loading, setLoading] = React.useState(false);
  const [fieldValues, setFieldValues] = React.useState({
    email: '',
    password: ''
  })
  const { setAuthToken } = useContext(Context);

  const handleChangeEmail = (e) => {
    const newValues = { ...fieldValues };
    newValues.email = e.target.value;
    setFieldValues(newValues);
  }

  const handleChangePassword = (e) => {
    const newValues = { ...fieldValues };
    newValues.password = e.target.value;
    setFieldValues(newValues);
  }

  const handleLogin = (e) => {
    setLoading(true);
    console.log(loading);

    axios.post('/admin/auth/login', {
      email: fieldValues.email,
      password: fieldValues.password
    })
      .then((response) => {
        console.log(response.data.token);
        setAuthToken(response.data.token);
        navigate('/dashboard');
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      })
  }

  const navigate = useNavigate();

  return (
    <>
      <Typography component="h1" variant="h4">
        Login
      </Typography>
      {loading
        ? (
          <div style={ { marginTop: '60px' } }>
            <Typography variant='h6'>Loading...</Typography>
          </div>
          )
        : (
          <form noValidate>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="text"
              autoFocus
              onChange={handleChangeEmail}
              />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChangePassword}
              />
              <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                  Sign In
              </Button>
              <Grid container direction="column" alignItems="center">
                  <Grid item>
                      <br />
                      <Link to="/register">
                          <Typography variant='h6'>{"Don't Have an account? Register."}</Typography>
                      </Link>
                  </Grid>
              </Grid>
          </form>
          )
      }
    </>
  );
}
