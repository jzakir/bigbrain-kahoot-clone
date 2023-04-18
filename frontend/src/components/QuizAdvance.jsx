import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import GradientButton from './GradientButton';
import WhiteBox from './WhiteBox';
import TitleButton from './TitleButton';

export default function QuizAdvance (props) {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <TitleButton title="Manage Game"/>
      <WhiteBox sx={{ height: '500px' }}>
        <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'rgb(248,130,135)' }}>{props.quizName}</Typography>
        <Typography variant='h6'>{props.currPos === -1 ? 'The game hasn\'t started yet.' : `The current position is: ${props.currPos}` }</Typography>
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
