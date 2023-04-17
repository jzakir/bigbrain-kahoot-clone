import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '16px',
  color: 'white',
  borderRadius: '5px',
  background: 'linear-gradient(315deg, #00b712 0%, #5aff15 74%)',
  '&:hover': {
    backgroundColor: '#2E3137',
    cursor: 'auto',
  }
});

export default function GreenButton (props) {
  return (<StyledButton variant='contained' {...props}>{props.children}</StyledButton>);
}
