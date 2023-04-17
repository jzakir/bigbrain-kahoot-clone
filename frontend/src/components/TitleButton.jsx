import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import GradientButton from './GradientButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function TitleButton (props) {
  return (
    <Box
      sx={{
        pt: 6
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component="h1"
          variant="h2"
          align="left"
          color="background.paper"
          gutterBottom
          style={{ textShadow: '2px 3px 5px rgba(0,0,0,0.5)' }}
        >
          {props.title}
        </Typography>
        {props.button && <GradientButton sx={{ height: '50%', alignSelf: 'center' }} onClick={props.onButtonClick}>{props.buttonText}<AddBoxIcon sx={{ pl: 0.5 }}/></GradientButton>}
      </Container>
    </Box>);
}
