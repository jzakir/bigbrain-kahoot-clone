import React from 'react';
import axios from '../axios';
import { Typography, Grid, Box, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, Context } from '../authContext';
import PrimaryButton from '../components/PrimaryButton';
import WhiteBox from '../components/WhiteBox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
    if (!fieldValues.email || !fieldValues.password) {
      // Create an error pop up here
      return;
    }

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
      <WhiteBox>
        <Typography variant="h4" sx={{ mb: 2 }}>Sign In</Typography>
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
              <PrimaryButton
                fullWidth
                onClick={handleLogin}
                sx={ { mt: 2, mb: 3 } }
              >
                Sign In
              </PrimaryButton>
              <Typography>
                Don&apos;t have an account?&nbsp;
                <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
              </Typography>
              <PrimaryButton
                variant="contained"
                onClick={() => { navigate('/') }}
                sx = { { alignSelf: 'flex-start', mt: 3 } }
              >
                <KeyboardBackspaceIcon sx={{ mr: 1 }}/>Home
              </PrimaryButton>
            </Box>
            )
        }
      </WhiteBox>
    </>
  );
}
