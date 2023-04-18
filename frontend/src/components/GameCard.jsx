import React from 'react';
import { Grid, Typography, CardContent, CardActions, IconButton, Card, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { defaultQuizThumbnail } from '../helpers';
import PrimaryButton from './PrimaryButton';
import axios from '../axios';
import { Context, useContext } from '../authContext';

const secondsToString = (seconds) => {
  if (seconds < 60) {
    return `${seconds} seconds`
  }
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

export default function GameCard (props) {
  const quiz = props.quiz;
  const { authToken } = useContext(Context);

  const [activeSession, setActiveSession] = React.useState(false);

  const checkActiveSession = (quizId) => {
    axios.get('/admin/quiz', { headers: { Authorization: `Bearer ${authToken}` } })
      .then(data => {
        const quizArr = data.data.quizzes;
        for (const quiz of quizArr) {
          if (quiz.id === quizId) {
            if (quiz.active) {
              setActiveSession(true);
            }
          }
        }
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => checkActiveSession(quiz.id), [props.popUpState]);

  return (<Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'white' }}
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
        <Typography color="grey">
          {`${quiz.questions.length} Question${quiz.questions.length !== 1 ? 's' : ''}`}
          <br />
          {`Estimated Time to Complete: ${secondsToString(quiz.questions
            .map(q => q.timeLimit)
            .reduce((sum, x) => sum + x, 0))}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrimaryButton onClick={ props.onStart }>
          {activeSession ? 'Stop Session' : 'Start Session'}
        </PrimaryButton>
        <Box>
          <Link to={`/edit/${quiz.id}`}>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton size="small" onClick={props.onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  </Grid>);
}
