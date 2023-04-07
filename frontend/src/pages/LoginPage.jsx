import React from 'react';
import axios from '../axios';
import { Button, Container, Typography, Box, Grid, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, Context } from '../authContext';

const boxStyle = {
  backgroundColor: '#FFFFFF',
  marginTop: '20px',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '2px'
};

export default function LoginPage () {
  const [loading, setLoading] = React.useState(false);
  const [fieldValues, setFieldValues] = React.useState({
    email: '',
    password: ''
  })

  const { authToken, setAuthToken } = useContext(Context);
  console.log(authToken);
  console.log(fieldValues);

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
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const navigate = useNavigate();

  return (
        <>
            <Container component="main" maxWidth="sm" style={ { marginTop: '100px' } }>
                <Box boxShadow={4} style={ boxStyle }>
                    <Typography component="h1" variant="h6">
                        Admin Login
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
                                        {"Don't have an account? Register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                        )}
                </Box>
                <br />
                <br />
                <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
            </Container>
        </>
  );
}
