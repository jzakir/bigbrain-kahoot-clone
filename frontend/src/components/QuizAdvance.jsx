import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import GradientButton from './GradientButton';
import WhiteBox from './WhiteBox';

export default function QuizAdvance (props) {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    setSeconds(props.currPos > -1 && props.currPos < props.questions.length ? props.questions[props.currPos].timeLimit : 0);
    const interval = window.setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.currPos])

  const questionString = () => {
    const size = props.questions.length;
    if (props.currPos < size) {
      if (props.currPos === -1) {
        return 'The game hasn\'t started yet.';
      } else {
        return `Question: ${props.currPos + 1}: ${props.questions[props.currPos].questionString}`;
      }
    }
    return '';
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant='h3' sx={{ color: 'white', mt: 20, mb: 4 }}>Manage Game</Typography>
      <WhiteBox sx={{ height: '500px' }}>
        <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'rgb(248,130,135)' }}>{props.quizName}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '200px', backgroundColor: 'lightgrey', mt: 4, alignItems: 'center', borderRadius: '10px' }}>
          <Typography variant='h4' sx={{ mt: 2 }}> { questionString() }</Typography>
          <Typography variant='h5' sx={{ mt: 4 }}>Time Left: {seconds >= 0 ? seconds : '0'}</Typography>
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
