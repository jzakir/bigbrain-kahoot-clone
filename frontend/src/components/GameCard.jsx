import React from 'react';
import { Grid, Typography, CardContent, CardActions, IconButton, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { defaultQuizThumbnail } from '../helpers';

const secondsToString = (seconds) => {
  if (seconds < 60) {
    return `${seconds} seconds`
  }
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

export default function GameCard (props) {
  const quiz = props.quiz;
  console.log(quiz);
  return (<Grid item xs={12} sm={6} md={4}>
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
        <Typography color="grey">
          {`${quiz.questions.length} Question${quiz.questions.length !== 1 ? 's' : ''}`}
          <br />
          {`Estimated Time to Complete: ${secondsToString(quiz.questions
            .map(q => q.timeLimit)
            .reduce((sum, x) => sum + x, 0))}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
        <Link to={`/edit/${quiz.id}`}>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton size="small" onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Grid>);
}
