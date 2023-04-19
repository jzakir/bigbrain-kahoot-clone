import React from 'react';
import PrimaryButton from './PrimaryButton';
import SelectedButton from './SelectedButton';

const style = {
  p: 2,
  m: 1,
  minWidth: '120px'
}

export default function PlayAnswerButton (props) {
  const answer = props.answer;
  return (
    props.selected
      ? <SelectedButton onClick={() => props.handleAnswerChange(answer.answerId)} sx={style}>{answer.answer}</SelectedButton>
      : <PrimaryButton onClick={() => props.handleAnswerChange(answer.answerId)} sx={style}>{answer.answer}</PrimaryButton>
  );
}
