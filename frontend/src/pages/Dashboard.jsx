import React from 'react';
import axios from '../axios';
import {
  Box, Container, Typography, TextField,
  Grid, Card, CardMedia, CardContent, CardActions, IconButton,
} from '@mui/material';
import PopUpModal from '../components/PopUpModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Context, useContext } from '../authContext';
import PrimaryButton from '../components/PrimaryButton';
import { Link } from 'react-router-dom';
import { defaultQuizThumbnail } from '../helpers';
import TitleButton from '../components/TitleButton';

export default function DashBoard () {
  const { authToken } = useContext(Context);

  const [allQuizzes, setQuizzes] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newQuizName, setNewQuizName] = React.useState('');

  const fetchQuizzes = () => {
    axios.get('/admin/quiz', { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => setQuizzes(data.data.quizzes))
      .catch(err => console.log(err));
  };

  const handleCreateQuiz = () => {
    axios.post('/admin/quiz/new', { name: newQuizName }, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        console.log(data);
        fetchQuizzes();
      })
      .catch(err => console.log(err))
      .finally(() => setModalOpen(false));
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

  const createCard = (quiz) => {
    return (<Grid item key={quiz.id} xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)' }}
      >
        <CardMedia
          component="img"
          image={quiz.thumbnail || defaultQuizThumbnail}
          alt="Quiz Thumbnail"
          sx={{ maxHeight: '200px' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {quiz.name}
          </Typography>
          <Typography>
            TODO: Number Of Questions + Total Time to complete
          </Typography>
        </CardContent>
        <CardActions sx={{ alignSelf: 'flex-end' }}>
          <Link to={`/edit/${quiz.id}`}>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton size="small" onClick={() => { deleteQuiz(quiz.id) }}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>);
  };

  React.useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <>
      <main>
        <TitleButton title="Dashboard" button buttonText="Create New Quiz" onButtonClick={() => setModalOpen(true)}/>
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Grid container spacing={4}>
            {allQuizzes.map(createCard)}
          </Grid>
        </Container>
      </main>
      <PopUpModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
          <Typography variant="h6" component="h2">
            Create New Quiz
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            name="quizName"
            label="Quiz Name"
            type="text"
            id="quizname"
            autoFocus
            onChange={(e) => setNewQuizName(e.target.value)}
            onKeyUp={(e) => {
              e.key === 'Enter' && handleCreateQuiz();
            }}
          />
          <Box sx={{ width: '100%', justifyContent: 'flex-end', display: 'flex', pt: 1 }}>
            <PrimaryButton onClick={handleCreateQuiz}>Create<AddBoxIcon sx={{ pl: 0.5 }}/></PrimaryButton>
          </Box>
      </PopUpModal>
    </>
  );
}
