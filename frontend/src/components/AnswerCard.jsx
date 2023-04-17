import { Input, IconButton, Checkbox, Card, CardContent, CardActions } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AnswerCard (props) {
  const cardStyle = {
    px: 5,
    margin: 2,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(147deg, #f71735 0%, #db3445 74%)'
  }

  if (props.isChecked) {
    cardStyle.background = 'linear-gradient(315deg, #00b712 0%, #5aff15 74%)'
  }

  const answer = props.answer;
  return (<Card sx={cardStyle}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Input
        variant="outlined"
        type="text"
        placeholder="Answer"
        defaultValue={answer.answer}
        fullWidth
        size="small"
        onChange={(e) => props.handleAnswerChange(answer.answerId, e.target.value)}
      />
    </CardContent>
    <CardActions sx={{ alignSelf: 'flex-end' }}>
      <IconButton size="small" onClick={props.onDelete}>
        <DeleteIcon />
      </IconButton>
      <Checkbox checked={props.isChecked} onChange={(e) => props.onCheck(answer.answerId, e.target.checked)}/>
    </CardActions>
  </Card>);
}
