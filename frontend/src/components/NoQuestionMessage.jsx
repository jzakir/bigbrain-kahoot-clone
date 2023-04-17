import React from 'react';
import { Typography } from '@mui/material';

const style = {
  px: 6, py: 6
}

export default function NoQuestionMessage () {
  return <Typography variant="h4" color="grey" sx={style}>No Questions right now, Try create some!</Typography>
}
