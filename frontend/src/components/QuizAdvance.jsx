import React from 'react';
import { Box, Typography } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import GradientButton from './GradientButton';
import WhiteBox from './WhiteBox';

export default function QuizAdvance (props) {
  return (
    <>
      <WhiteBox sx={{ height: '500px' }}>
        <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'rgb(248,130,135)' }}>{props.quizName}</Typography>
        <Typography variant='h6'>{props.currPos === -1 ? 'The game hasn\'t started yet.' : `The current position is: ${props.currPos}` }</Typography>
        <Box sx={{ display: 'flex', mt: 10 }}>
          <PrimaryButton onClick={ props.handleStop }>
            Stop Session
          </PrimaryButton>
          <GradientButton onClick={ props.handleAdvance }>
            Advance Question
          </GradientButton>
        </Box>
      </WhiteBox>
    </>
  )
}
