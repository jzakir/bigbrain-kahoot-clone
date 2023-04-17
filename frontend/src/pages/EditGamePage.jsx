import React from 'react';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Container, Typography, Grid
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PrimaryButton from '../components/PrimaryButton';
import PopUpModal from '../components/PopUpModal';
import { Context, useContext } from '../authContext';
import { fileToDataUrl } from '../helpers';
import Loading from '../layouts/Loading';
import EmptyMessage from '../components/EmptyMessage';
import TitleButton from '../components/TitleButton';
import QuestionCard from '../components/QuestionCard';
import GameDetailsCard from '../components/GameDetailsCard';
import BackButton from '../components/BackButton';

export default function EditGamePage () {
  const navigate = useNavigate();
  const { authToken } = useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [game, setGame] = React.useState(null);
  const [changesSavedModal, setChangesSavedModal] = React.useState(false);
  const params = useParams();

  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [newQuizName, setNewQuizName] = React.useState('');

  const saveMetadata = async () => {
    console.log(game.questions);
    axios.put(`/admin/quiz/${params.gameId}`,
      {
        name: newQuizName,
        ...(uploadedFile) && {
          thumbnail: await fileToDataUrl(uploadedFile),
        },
        questions: game.questions
      }, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(() => {
        fetchGameDetails();
      })
      .catch(err => console.error(err));
  }

  const createGameCard = (game) => {
    return (<GameDetailsCard
      game={game}
      uploadedFile={uploadedFile}
      setUploadedFile={setUploadedFile}
      setNewQuizName={setNewQuizName}
      onSave={async () => { await saveMetadata(); setChangesSavedModal(true); }}/>)
  }

  const createQuestionCard = (question) => {
    return <QuestionCard question={question} onDelete={() => { deleteQuestion(question.id); saveMetadata(); }}/>
  };

  const fetchGameDetails = () => {
    setLoading(true);
    axios.get(`/admin/quiz/${params.gameId}`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(response => {
        setGame(response.data);
        setNewQuizName(response.data.name);
        setLoading(false);
      })
      .catch(err => alert(err))
  }

  React.useEffect(() => fetchGameDetails(), []);

  const createNewQuestion = () => {
    const questionIds = game.questions.length ? game.questions.map(x => x.id) : [0];
    const newId = Math.max(...questionIds) + 1;
    game.questions.push({
      id: newId,
      type: 'single',
      questionString: 'New Question',
      selections: [
        { answer: 'Option A', answerId: 0 },
        { answer: 'Option B', answerId: 1 },
        { answer: 'Option C', answerId: 2 },
        { answer: 'Option D', answerId: 3 },
      ],
      correctAnswerIds: [0],
      points: 10,
      timeLimit: 20,
    })
    saveMetadata();
  }

  const deleteQuestion = (questionId) => {
    game.questions = game.questions.filter(q => q.id !== questionId);
  }

  return (
    <>
      <main>
        <TitleButton title="Edit Game"/>
          <Container maxWidth="lg" sx={{ pb: 6 }}>
            {loading ? <Loading/> : createGameCard(game)}
          </Container>
        <TitleButton title={'Questions'} button buttonText={'Create New Question'} onButtonClick={createNewQuestion}/>
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Grid container spacing={4}>
            {loading ? <Loading/> : (game.questions.length ? game.questions.map(createQuestionCard) : <EmptyMessage>No Questions. Try create some!</EmptyMessage>)}
          </Grid>
        </Container>
        <BackButton link="/dashboard" buttonText="Back to Dashboard" navigate={navigate}/>
      </main>
      <PopUpModal
        open={changesSavedModal}
        onClose={() => setChangesSavedModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: '100%', justifyContent: 'space-between', display: 'flex', pt: 1 }}>
          <Typography variant="h6" component="h2">
            Changes Saved!
          </Typography>
          <PrimaryButton onClick={() => setChangesSavedModal(false)}>Ok<DoneIcon sx={{ pl: 0.5 }}/></PrimaryButton>
        </Box>
      </PopUpModal>
    </>
  );
}
