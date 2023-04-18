import React from 'react';
import { Grid, Typography, CardContent, CardActions, IconButton, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import GreenButton from './GreenButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { defaultQuestionThumbnail, embedLink, extractYoutubeId } from '../helpers';

export default function QuestionCard (props) {
  const question = props.question;
  const videoId = extractYoutubeId(question.url);
  return (<Grid item key={question.id} xs={12} sm={6} md={4}>
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)' }}
    >
      <CardMedia
        component={videoId ? 'iframe' : 'img'}
        src={videoId ? embedLink(videoId) : (question.url || defaultQuestionThumbnail)}
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
        <IconButton size="small" onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Grid>);
}
