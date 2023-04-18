import React from 'react';
import PrimaryButton from './PrimaryButton';
import GreenButton from './GreenButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const StartButtonText = () => {
  return (<>{'Start Session'}<PlayArrowIcon sx={{ pl: 0.5 }}/></>)
}

const StopButtonText = () => {
  return (<>{'Stop Session'}<StopIcon sx={{ pl: 0.5 }}/></>)
}

export default function SessionButton (props) {
  return props.started
    ? (<PrimaryButton {...props}><StopButtonText/></PrimaryButton>)
    : (<GreenButton {...props}><StartButtonText/></GreenButton>);
}
