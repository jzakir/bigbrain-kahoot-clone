import React from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField
} from '@mui/material';
import PrimaryButton from '../components/PrimaryButton';
import WhiteBox from '../components/WhiteBox';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axios';
import { useContext, Context } from '../authContext';

export default function RegisterPage () {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setAuthToken } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === '' || password === '' || name === '') {
      // Create an error pop up here
      return;
    }

    setLoading(true);
    axios
      .post('/admin/auth/register', {
        email,
        password,
        name
      })
      .then(response => {
        setAuthToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  return (
      <>
        <WhiteBox>
          <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>
          {loading
            ? (
            <div>
              <Typography variant='h6'>Loading...</Typography>
            </div>
              )
            : (
            <Box component='form' noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <PrimaryButton
                type='submit'
                fullWidth
                sx={ { mt: 3, mb: 3 } }
              >
              Register
              </PrimaryButton>
              <Typography>
                Already have an account?&nbsp;
                <Link to="/login" style={{ textDecoration: 'none' }}>Sign In</Link>
              </Typography>
            </Box>
              )}
        </WhiteBox>
      </>
  );
}
