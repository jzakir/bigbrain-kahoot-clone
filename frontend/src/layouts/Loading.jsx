import React from 'react';
import { CircularProgress } from '@mui/material';

export default function Loading () {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </div>
  );
}
