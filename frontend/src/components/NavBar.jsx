import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';

export default function NavBar () {
  return (
    <>
        <AppBar position="relative" color="primary" enableColorOnDark style={ { margin: -10, width: '100vw' } }>
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    BigBrain!
                </IconButton>
            </Toolbar>
        </AppBar>
    </>
  );
}
