import React from 'react';
import { Container } from '@mui/material';
import GradientButton from './GradientButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton (props) {
  return (
    <Container maxWidth="lg" sx={{ pb: 6, display: 'flex', justifyContent: 'flex-end' }}>
      <GradientButton sx={{ height: '50%' }} onClick={() => props.navigate(props.link)}>{props.buttonText}<ArrowBackIcon sx={{ pl: 0.5 }}/></GradientButton>
    </Container>
  );
}
