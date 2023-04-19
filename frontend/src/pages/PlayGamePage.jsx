import React from 'react';
import WhiteBox from '../components/WhiteBox';
import PlayGameQuestion from '../components/PlayGameQuestion';

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
  return (
    <>
      <WhiteBox>
        <PlayGameQuestion question={question}/>
      </WhiteBox>
    </>
  )
}
