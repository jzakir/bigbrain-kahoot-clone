import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '16px',
  color: 'white',
  borderRadius: '5px',
  background: 'orange',
  '&:hover': {
    background: 'orange',
    cursor: 'auto',
  },
});

export default function SelectedButton (props) {
  return (<StyledButton variant='contained' {...props}>{props.children}</StyledButton>);
}
