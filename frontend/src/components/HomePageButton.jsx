import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  height: '350px',
  width: '350px',
  padding: '50px'
});

export default function HomePageButton (props) {
  return (<StyledButton {...props} variant="contained">{props.children}</StyledButton>);
}
