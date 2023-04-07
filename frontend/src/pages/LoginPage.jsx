import React from 'react';
import { Button, Container, Typography, Box, Grid, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

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
  const navigate = useNavigate();
  return (
        <>
            <Container component="main" maxWidth="sm" style={ { marginTop: '20px' } }>
                <Box boxShadow={3} style={ boxStyle }>
                    <Typography component="h1" variant="h6">
                        Admin Login
                    </Typography>
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
                        autoComplete="current-password"
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Sign In
                        </Button>
                        <Grid container direction="column" alignItems="center">
                            <Grid item>
                                <br />
                                <Link to="/register" variant="body1">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <br />
                <br />
                <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
            </Container>
        </>
  );
}
