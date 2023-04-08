import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#F7F7F2',
  padding: '40px',
  borderRadius: '2%'
});

export default function WhiteBox (props) {
  return <StyledBox {...props}>{props.children}</StyledBox>;
}
