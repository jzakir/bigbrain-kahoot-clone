import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '16px',
  color: 'white',
  borderRadius: '5px',
  backgroundColor: '#2E3137',
  '&:hover': {
    backgroundColor: '#2E3137',
    color: 'orange'
  }
});

export default function PrimaryButton (props) {
  return (<StyledButton variant='contained' {...props}>{props.children}</StyledButton>);
}
