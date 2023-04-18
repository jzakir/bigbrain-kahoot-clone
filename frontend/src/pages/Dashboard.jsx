import React from 'react';
import axios from '../axios';
import {
  Box, Container, Typography, TextField,
  Grid
} from '@mui/material';
import PopUpModal from '../components/PopUpModal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Context, useContext } from '../authContext';
import PrimaryButton from '../components/PrimaryButton';
import TitleButton from '../components/TitleButton';
import GameCard from '../components/GameCard';
import Loading from '../layouts/Loading';
import GradientButton from '../components/GradientButton';

export default function DashBoard () {
  const { authToken } = useContext(Context);

  const [allQuizzes, setQuizzes] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newQuizName, setNewQuizName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sessionModal, setSessionModal] = React.useState(false);
  const [currSession, setCurrSession] = React.useState('');

  const fetchQuizzes = () => {
    setLoading(true);
    axios.get('/admin/quiz', { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        const requests = data.data.quizzes.map(quiz => {
          return new Promise((resolve, reject) => {
            axios.get(`/admin/quiz/${quiz.id}`, { headers: { Authorization: `Bearer ${authToken}` } })
              .then(data => {
                const newData = { ...(data.data) };
                newData.id = quiz.id;
                resolve(newData);
              })
          })
        });
        Promise.all(requests)
          .then(x => {
            setQuizzes(x);
            setLoading(false);
          });
      });
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

  const handleStartSession = (quizId) => {
    axios.post(`/admin/quiz/${quizId}/start`, { path: quizId }, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        axios.get(`/admin/quiz/${quizId}`, { headers: { Authorization: `Bearer ${authToken}` } })
          .then(data => {
            setCurrSession(data.data.active);
            setSessionModal(true);
          })
      })
      .catch(err => console.log(err));
  }

  const handleStopSession = (quizId, sessionId) => {
    axios.post(`/admin/quiz/${quizId}/end`, {}, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        // Modal to ask to view results
        // quiz.active contains sessionId
        // API Call to admin/session/${quiz.active}/results for the info
      })
      .catch(err => console.log(err));
  }

  const createCard = (quiz) => {
    return <GameCard
      key={quiz.id}
      quiz={quiz}
      onStart={() => handleStartSession(quiz.id)}
      onStop={handleStopSession}
      popUpState={sessionModal}
      onDelete={() => deleteQuiz(quiz.id)}
    />
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
            {loading ? <Loading/> : allQuizzes.map(createCard)}
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
      <PopUpModal
        open={sessionModal}
        onClose={() => setSessionModal(false)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h2">
            Session Started!
          </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'lightGrey', height: '50px', borderRadius: '10px', mt: 2 }}>
              <Box component="div" sx={{ overflow: 'auto', ml: 1 }}>
              <Typography>Session ID: {currSession}</Typography>
              </Box>
            </Box>
          <GradientButton sx={{ alignSelf: 'flex-end', mt: 2 }}>
            Copy Link
          </GradientButton>
        </Box>
      </PopUpModal>
    </>
  );
}
