import React from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography,
  Grid, Card, CardMedia, CardContent, CardActions, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Context, useContext } from '../authContext';
import PrimaryButton from '../components/PrimaryButton';

export default function DashBoard () {
  const navigate = useNavigate();
  const { authToken } = useContext(Context);

  const [allQuizzes, setQuizzes] = React.useState([]);

  const fetchQuizzes = () => {
    axios.get('/admin/quiz', { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => setQuizzes(data.data.quizzes))
      .catch(err => console.log(err));
  };

  const createQuiz = (name) => {
    axios.post('/admin/quiz/new', { name }, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        console.log(data);
        fetchQuizzes();
      })
      .catch(err => console.log(err));
  };

  const deleteQuiz = (quizId) => {
    axios.delete(`admin/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(data => {
        console.log(data);
        fetchQuizzes();
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 6
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
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Grid container spacing={4}>
            {allQuizzes.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={card.thumbnail || 'https://kahoot.com/files/2020/03/Schools-library-GettingStarted-570x320.png'}
                    alt="Quiz Thumbnail"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      TODO: Number Of Questions + Total Time to complete
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => { deleteQuiz(card.id) }}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <PrimaryButton variant="contained" onClick={() => { createQuiz('Test Quiz') }}>Create Dummy Quiz</PrimaryButton>
      <br />
      <PrimaryButton variant="contained" onClick={() => { navigate('/') }}>Back to Home</PrimaryButton>
    </>
  );
}
