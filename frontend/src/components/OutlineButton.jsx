import React from 'react';
import { Button } from '@mui/material';
// import { styled } from '@mui/system';

// const StyledButton = styled(Button)({

// });

export default function HomePageButton (props) {
  return (<Button {...props} variant="outlined">{props.children}</Button>);
}
