import React from 'react';
import WhiteBox from '../components/WhiteBox';
import PlayGameQuestion from '../components/PlayGameQuestion';
import { useParams } from 'react-router-dom';

const question = {
  id: 0,
  questionString: 'Test Question',
  type: 'single',
  selections: [
    {
      answer: 'First Answer',
      answerId: 0
    },
    {
      answer: 'Second Answer',
      answerId: 1
    },
    {
      answer: 'Third Answer',
      answerId: 2
    },
    {
      answer: '4',
      answerId: 3
    }
  ],
  timeLimit: 200,
}

export default function PlayGamePage () {
  const params = useParams();
  return (
    <>
      <WhiteBox>
        <h1>{`Session ID: ${params.sessionId}, PlayerId: ${params.playerId}`}</h1>
        <PlayGameQuestion question={question}/>
      </WhiteBox>
    </>
  )
}
