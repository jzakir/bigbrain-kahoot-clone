import React from 'react';
import TitleButton from '../components/TitleButton';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../layouts/Loading';
import { Context, useContext } from '../authContext';
import { defaultQuestionThumbnail, fileToDataUrl, embedLink, extractYoutubeId } from '../helpers';
import {
  Container, Typography, CardContent, CardActions, Card, CardMedia, Input,
  FormControl, FormControlLabel, Radio, FormLabel, RadioGroup, TextField, InputAdornment,
  Box
} from '@mui/material';
import PrimaryButton from '../components/PrimaryButton';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import axios from '../axios';
import AnswerCard from '../components/AnswerCard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PopUpModal from '../components/PopUpModal';

export default function EditQuestionPage () {
  const navigate = useNavigate();
  const { authToken } = useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [isFileUploaded, setFileUploaded] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [question, setQuestion] = React.useState(null);
  const [errorPopUpMessage, setErrorMessage] = React.useState('');
  const [openPopUp, setPopUp] = React.useState(false);
  const params = useParams();

  const fetchGameDetails = () => {
    setLoading(true);
    axios.get(`/admin/quiz/${params.gameId}`, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(response => {
        setQuestions(response.data.questions);
        return response.data.questions;
      })
      .then(questions => questions.forEach(q => {
        // for some reason Array.find() or Array.filter() dont work here
        if (q.id === parseInt(params.questionId)) {
          setQuestion(q);
          setLoading(false);
        }
      }))
      .catch(err => alert(err));
  }

  const checkValidQuestion = (question) => {
    if (question.type === 'single' && question.correctAnswerIds.length !== 1) {
      popUp('Single question type must have exactly 1 correct answer');
      return false;
    }
    return true;
  }

  const saveChanges = () => {
    const savedQuestions = [...questions];
    for (const q of savedQuestions) {
      if (q.id === question.id) {
        q.questionString = question.questionString;
        q.type = question.type;
        q.points = parseInt(question.points);
        q.timeLimit = parseInt(question.timeLimit);
        q.url = question.url;
        q.correctAnswerIds = question.correctAnswerIds;
        q.selections = question.selections;
        if (!checkValidQuestion(q)) {
          return;
        }
      }
    }
    axios.put(`/admin/quiz/${params.gameId}`, { questions: savedQuestions }, { headers: { Authorization: `Bearer ${authToken}` } })
      .then(() => {
        popUp('Changes Saved!');
        fetchGameDetails();
      })
      .catch(err => console.error(err));
  }

  const popUp = (message) => {
    setErrorMessage(message);
    setPopUp(true);
  }

  React.useEffect(() => fetchGameDetails(), []);

  const handleLimitChange = (value) => {
    const newDetails = { ...question };
    newDetails.timeLimit = value;
    setQuestion(newDetails);
  }

  const handleQuestionChange = (value) => {
    const newDetails = { ...question };
    newDetails.questionString = value;
    setQuestion(newDetails);
  }

  const handlePointsChange = (value) => {
    const newDetails = { ...question };
    newDetails.points = value;
    setQuestion(newDetails);
  }

  const handleUrlChange = (value) => {
    const newDetails = { ...question };
    newDetails.url = value;
    setQuestion(newDetails);
  }

  const handleImageUploaded = async (value) => {
    const newDetails = { ...question };
    newDetails.url = await fileToDataUrl(value);
    setFileUploaded(value.name);
    setQuestion(newDetails);
  }

  const handleTypeChange = (value) => {
    const newDetails = { ...question };
    newDetails.type = value;
    setQuestion(newDetails);
  }

  const handleAnswerChange = (answerId, value) => {
    const newQuestion = { ...question }
    const newAnswers = newQuestion.selections;
    for (const answer of newAnswers) {
      if (answer.answerId === answerId) {
        answer.answer = value;
      }
    }
    newQuestion.selections = newAnswers;
    setQuestion(newQuestion);
  }

  // TODO Clean this up
  const handleCheck = (answerId, checked) => {
    const updatedQuestion = { ...question };
    if (checked) {
      if (!updatedQuestion.correctAnswerIds.includes(answerId)) {
        if (updatedQuestion.type === 'single') {
          // Clear all selections first
          updatedQuestion.correctAnswerIds = [];
        }
        updatedQuestion.correctAnswerIds.push(answerId);
      }
    } else {
      if (updatedQuestion.correctAnswerIds.length <= 1) {
        popUp('You must have at least one correct answer.');
        return;
      }
      if (updatedQuestion.correctAnswerIds.includes(answerId)) {
        updatedQuestion.correctAnswerIds = updatedQuestion.correctAnswerIds.filter(a => a !== answerId);
      }
      console.log(updatedQuestion.correctAnswerIds);
    }
    setQuestion(updatedQuestion);
  }

  const createNewAnswer = () => {
    const newQuestion = { ...question };
    const answers = newQuestion.selections;
    if (answers.length >= 6) {
      // Switch to modal
      popUp('You cannot have more than 6 answers.');
      return;
    }
    const answerIds = answers.length ? answers.map(x => x.answerId) : [0];
    const newId = Math.max(...answerIds) + 1;
    answers.push({
      answer: 'New Answer',
      answerId: newId,
    });
    newQuestion.selections = answers;
    setQuestion(newQuestion);
  }

  const deleteAnswer = (answerId) => {
    const newQuestion = { ...question };
    const answers = newQuestion.selections;
    if (answers.length <= 2) {
      // Switch to modal
      alert('You cannot have less than 2 answers');
      return;
    }
    newQuestion.selections = answers.filter(a => a.answerId !== answerId);
    setQuestion(newQuestion);
  }

  const createCard = (question) => {
    const videoId = extractYoutubeId(question.url);
    return (<Card
      sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', background: 'linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)' }}
    >
      <CardMedia
        component={videoId ? 'iframe' : 'img'}
        src={videoId ? embedLink(videoId) : (question.url || defaultQuestionThumbnail)}
        alt="Quiz Thumbnail"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          <Input
            variant="outlined"
            name="gameName"
            type="text"
            placeholder="Question"
            defaultValue={question.questionString}
            sx={{ fontSize: '1.5em' }}
            fullWidth
            onChange={(e) => handleQuestionChange(e.target.value)}
          />
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PrimaryButton onClick={createNewAnswer}>Add New Answer <AddBoxIcon sx={{ pl: 0.5 }}/></PrimaryButton>
        </div>
        <div style={{ display: 'flex' }}>
          <FormControl>
            <FormLabel>Answer Type</FormLabel>
            <RadioGroup
              row
              value={question.type}
              name="radio-buttons-group"
              onChange={(e) => handleTypeChange(e.target.value)}
              >
              <FormControlLabel value="single" control={<Radio />} label="Single"/>
              <FormControlLabel value="multiple" control={<Radio />} label="Multiple"/>
            </RadioGroup>
            <TextField
              type="number"
              label="Time Limit"
              variant="standard"
              defaultValue={question.timeLimit}
              sx={{ my: 1 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">seconds</InputAdornment>,
              }}
              onChange={(e) => handleLimitChange(e.target.value)}/>
            <TextField
              type="number"
              label="Points"
              variant="standard"
              defaultValue={question.points}
              sx={{ my: 1 }}
              onChange={(e) => handlePointsChange(e.target.value)}/>
            <TextField
              type="text"
              label="YouTube Video or Image URL"
              variant="standard"
              defaultValue={question.url || ''}
              sx={{ my: 1 }}
              helperText="Optional"
              placeholder='https://www.youtube.com/watch?v=VIDEO_ID'
              onChange={(e) => handleUrlChange(e.target.value)}/>
            <PrimaryButton variant="contained" component="label" sx={ { ml: 1 } }>
              Upload
            <InsertPhotoIcon sx={{ pl: 0.5 }}/>
            <input hidden accept="image/*" type="file" onChange={(e) => handleImageUploaded(e.target.files[0])}/>
            </PrimaryButton>
            <div style={{ display: 'flex', padding: 10 }}>
              {isFileUploaded && <><Typography>{isFileUploaded}</Typography><FileDownloadDoneIcon sx={{ color: 'lime' }}/></>}
            </div>
          </FormControl>
          <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
            {question.selections.map(a => <AnswerCard
              answer={a}
              key={a.answerId}
              onCheck={handleCheck}
              handleAnswerChange={handleAnswerChange}
              onDelete={() => deleteAnswer(a.answerId)}
              isChecked={question.correctAnswerIds.includes(a.answerId)}/>)}
          </Container>
        </div>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
      <PrimaryButton sx={{ height: '50%', alignSelf: 'center' }} onClick={saveChanges}>Save Changes<SaveIcon sx={{ pl: 0.5 }}/></PrimaryButton>
      </CardActions>
    </Card>);
  }

  return (
    <>
      <main>
        <TitleButton title="Edit Question"/>
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          {loading ? <Loading/> : createCard(question)}
        </Container>
        <BackButton link={'/edit/' + params.gameId} buttonText="Back to Game" navigate={navigate}/>
      </main>
      <PopUpModal
        open={openPopUp}
        onClose={() => setPopUp(false)}
      >
        <Box sx={{ width: '100%', justifyContent: 'space-between', display: 'flex', pt: 1 }}>
          <Typography variant="h6" component="h2">
            {errorPopUpMessage}
          </Typography>
          <PrimaryButton onClick={() => setPopUp(false)}>OK<DoneIcon sx={{ pl: 0.5 }}/></PrimaryButton>
        </Box>
      </PopUpModal>
    </>
  );
}
