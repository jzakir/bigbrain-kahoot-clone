import { Typography } from '@mui/material';
import React from 'react';

export default function PlayResult (props) {
  const results = props.results
  return (results.map(res => <Typography key={res}>{res}</Typography>))
}
