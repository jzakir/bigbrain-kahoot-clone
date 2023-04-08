import React from 'react';
import axios from '../axios';
import { Button, Typography, Grid, Box, TextField } from '@mui/material';
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

    axios.post('/admin/auth/login', {
      email: fieldValues.email,
      password: fieldValues.password
    })
      .then((response) => {
        setAuthToken(response.data.token);
        localStorage.setItem('token', response.data.token);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#F7F7F2',
          padding: '40px',
          borderRadius: '10px'
        }}
      >
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>
        {loading
          ? (
            <div style={ { marginTop: '60px' } }>
              <Typography variant='h6'>Loading...</Typography>
            </div>
            )
          : (
            <Box component='form' noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={ { backgroundColor: '#2E3137', mt: 2, mb: 3 } }
              >
                Sign In
              </Button>
              <Typography>
                Don&apos;t have an account?&nbsp;
                <Link to="/register">Register</Link>
              </Typography>
            </Box>
            )
        }
      </Box>
    </>
  );
}
