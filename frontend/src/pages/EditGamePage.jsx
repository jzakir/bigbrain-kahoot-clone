import React from 'react';
import axios from '../axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box, Container, Typography, Input,
  Grid, Card, CardMedia, CardContent, CardActions, IconButton
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DoneIcon from '@mui/icons-material/Done';
import PrimaryButton from '../components/PrimaryButton';
import GradientButton from '../components/GradientButton';
import GreenButton from '../components/GreenButton';
import PopUpModal from '../components/PopUpModal';
import { Context, useContext } from '../authContext';
import { defaultQuizThumbnail, defaultQuestionThumbnail, fileToDataUrl } from '../helpers';
import Loading from '../layouts/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NoQuestionMessage from '../components/NoQuestionMessage';
import TitleButton from '../components/TitleButton';

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
    return (<Card
      sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', background: 'linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)' }}
    >
      <CardMedia
        component="img"
        image={game.thumbnail || defaultQuizThumbnail}
        alt="Quiz Thumbnail"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
        <Input
          variant="outlined"
          name="gameName"
          type="text"
          placeholder="Game Title"
          defaultValue={game.name}
          sx={{ fontSize: '1.5em' }}
          onChange={e => setNewQuizName(e.target.value)}
        />
        </Typography>
        <Typography>
          Created on {new Date(game.createdAt).toDateString()} by {game.owner}
        </Typography>
        <div style={ { display: 'flex', alignItems: 'center', gap: '5px' } }>
          <Typography>
            Update Image:
          </Typography>
          <PrimaryButton variant="contained" component="label" sx={ { ml: 1 } }>
            Upload
            <InsertPhotoIcon sx={{ pl: 0.5 }}/>
            <input hidden accept="image/*" type="file" onChange={e => setUploadedFile(e.target.files[0])} />
          </PrimaryButton>
          {uploadedFile && <><Typography>{uploadedFile.name}</Typography><FileDownloadDoneIcon sx={{ color: 'lime' }}/></>}
        </div>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
      <PrimaryButton sx={{ height: '50%', alignSelf: 'center' }} onClick={async () => { await saveMetadata(); setChangesSavedModal(true); }}>Save Quiz Details<SaveIcon sx={{ pl: 0.5 }}/></PrimaryButton>
      </CardActions>
    </Card>);
  }

  const createQuestionCard = (question) => {
    console.log(question);
    return (<Grid item key={question.id} xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)' }}
      >
        <CardMedia
          component="img"
          image={question.url || defaultQuestionThumbnail}
          alt="Quiz Thumbnail"
          sx={{ maxHeight: '200px' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {question.questionString}
          </Typography>
            <Grid sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {question.selections.map(x =>
                question.correctAnswerIds.includes(x.answerId)
                  ? (<GreenButton key={x.answerId}>{x.answer}</GreenButton>)
                  : (<PrimaryButton sx={{ cursor: 'auto' }} key={x.answerId}>{x.answer}</PrimaryButton>)
              )}
            </Grid>
        </CardContent>
        <CardActions sx={{ alignSelf: 'flex-end' }}>
          <Link to={`${question.id}`}>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton size="small" onClick={() => { deleteQuestion(question.id); saveMetadata(); }}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>);
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
            {loading ? <Loading/> : (game.questions.length ? game.questions.map(createQuestionCard) : <NoQuestionMessage/>)}
          </Grid>
          <GradientButton sx={{ height: '50%', mt: 4 }} onClick={() => navigate('/dashboard')}>Save Changes<SaveIcon sx={{ pl: 0.5 }}/></GradientButton>
        </Container>
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
