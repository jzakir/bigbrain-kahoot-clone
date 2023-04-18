import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import GradientButton from './GradientButton';
import WhiteBox from './WhiteBox';

export default function QuizAdvance (props) {
  const questionString = () => {
    const size = props.questions.length;
    console.log(props.currPos);
    if (props.currPos < size) {
      if (props.currPos === -1) {
        return 'The game hasn\'t started yet.';
      } else {
        return `Question: ${props.currPos + 1}: ${props.questions[props.currPos].questionString}`;
      }
    }
    return '';
  }
  console.log(props.questions);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant='h3' sx={{ color: 'white', mt: 20, mb: 4 }}>Manage Game</Typography>
      <WhiteBox sx={{ height: '500px' }}>
        <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'rgb(248,130,135)' }}>{props.quizName}</Typography>
        <Box sx={{ display: 'flex', width: '100%', height: '200px', backgroundColor: 'lightgrey', mt: 4, justifyContent: 'center', borderRadius: '10px' }}>
          <Typography variant='h6' sx={{ mt: 2 }}> { questionString() }</Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 10 }}>
          <PrimaryButton onClick={ props.handleStop } sx={{ ml: 4 }}>
            Stop Session
          </PrimaryButton>
          <GradientButton onClick={ props.handleAdvance } sx={{ ml: 6 }}>
            Advance Question
          </GradientButton>
        </Box>
      </WhiteBox>
    </Container>

  )
}
