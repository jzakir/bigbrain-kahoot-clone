import React from 'react';
import { Button } from '@mui/material';

export default function HomePageButton (props) {
  const style = {
    height: '350px',
    width: '350px',
    padding: '50px'
  };
  return <><Button {...props} variant="contained" style={style}>{props.children}</Button></>;
}
