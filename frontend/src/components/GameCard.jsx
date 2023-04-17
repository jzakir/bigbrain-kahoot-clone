import React from 'react';
import { Grid, Typography, CardContent, CardActions, IconButton, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { defaultQuizThumbnail } from '../helpers';

export default function GameCard (props) {
  const quiz = props.quiz;
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
        <IconButton size="small" onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Grid>);
}
