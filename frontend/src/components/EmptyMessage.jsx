import React from 'react';
import { Typography } from '@mui/material';

const style = {
  px: 6, py: 6
}

export default function EmptyMessage (props) {
  return <Typography variant="h4" color="grey" sx={style}>{props.children}</Typography>
}
