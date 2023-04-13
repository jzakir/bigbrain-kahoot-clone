import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '16px',
  color: 'white',
  borderRadius: '5px',
  background: 'linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))',
  '&:hover': {
    border: '1px solid rgb(248,130,135)',
    color: 'rgb(248,130,135)',
    backgroundSize: '100%',
    backgroundRepeat: 'repeat',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundImage: 'linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))',
  }
});

export default function GradientButton (props) {
  return (<StyledButton variant='contained' {...props}>{props.children}</StyledButton>);
}
