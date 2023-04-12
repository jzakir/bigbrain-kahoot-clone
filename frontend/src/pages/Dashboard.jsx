import React from 'react';
import axios from '../axios';
import {
  Box, Container, Typography, TextField,
  Grid, Card, CardMedia, CardContent, CardActions, IconButton,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Context, useContext } from '../authContext';
import PrimaryButton from '../components/PrimaryButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DashBoard () {
  const { authToken } = useContext(Context);

  const [allQuizzes, setQuizzes] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [quizName, setQuizName] = React.useState('');

  console.log(quizName);

  const fetchQuizzes = () => {
    axios.get('/admin/quiz', { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => setQuizzes(data.data.quizzes))
      .catch(err => console.log(err));
  };

  const handleCreateQuiz = () => {
    axios.post('/admin/quiz/new', { name: quizName }, { headers: { Authorization: `Bearer ${authToken}` } })
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
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          image={quiz.thumbnail || 'https://kahoot.com/files/2020/03/Schools-library-GettingStarted-570x320.png'}
          alt="Quiz Thumbnail"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {quiz.name}
          </Typography>
          <Typography>
            TODO: Number Of Questions + Total Time to complete
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
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
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 6
          }}
        >
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Dashboard
            </Typography>
            <PrimaryButton sx={{ height: '50%', alignSelf: 'center' }} onClick={() => setModalOpen(true)}>Create New Quiz<AddBoxIcon sx={{ pl: 0.5 }}/></PrimaryButton>
          </Container>
        </Box>
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Grid container spacing={4}>
            {allQuizzes.map(createCard)}
          </Grid>
        </Container>
      </main>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
            onChange={(e) => setQuizName(e.target.value)}
            onKeyUp={(e) => {
              e.key === 'Enter' && handleCreateQuiz();
            }}
          />
          <Box sx={{ width: '100%', justifyContent: 'flex-end', display: 'flex', pt: 1 }}>
            <PrimaryButton onClick={handleCreateQuiz}>Create<AddBoxIcon sx={{ pl: 0.5 }}/></PrimaryButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
