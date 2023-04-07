import React from 'react';
import {
  Button,
  Grid,
  Box,
  Typography,
  TextField
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axios';

export default function RegisterPage () {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/admin/auth/register', {
        email: email,
        password: password,
        name: name
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('add loading state here');
      })
  }

  console.log(name);
  console.log(email);
  console.log(password);

  return (
      <>
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>
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
            <Button
              type='submit'
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
            Register
            </Button>
          </Box>
          <Typography variant="h6">
            Already have an account?
            <Link to="/login">Sign In</Link>
          </Typography>
          <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
        </Box>
      </>
  );
}
