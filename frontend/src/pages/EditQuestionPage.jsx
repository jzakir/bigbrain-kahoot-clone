import React from 'react';
import { useParams } from 'react-router-dom';

export default function EditQuestionPage () {
  const params = useParams();
  return (<h1>Editing {params.questionId} of game {params.gameId}</h1>)
}
