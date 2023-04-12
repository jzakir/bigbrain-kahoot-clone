import React from 'react';
// import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { Context, useContext } from '../authContext';

export default function DashBoard () {
  const navigate = useNavigate();
  const { authToken } = useContext(Context);

  const cards = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <p>Token: {authToken}</p>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <Container>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Available Quizzes
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://kahoot.com/files/2020/03/Schools-library-GettingStarted-570x320.png"
                    alt="Quiz Thumbnail"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Button variant="contained" onClick={() => { navigate('/') }}>Back to Home</Button>
    </>
  );
}
