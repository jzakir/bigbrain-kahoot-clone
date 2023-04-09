import React from 'react';
import { styled } from '@mui/system';
import PrimaryButton from './PrimaryButton';

const StyledButton = styled(PrimaryButton)({
  height: '120px',
  width: '350px',
});

export default function HomePageButton (props) {
  return (<StyledButton {...props} variant="contained">{props.children}</StyledButton>);
}
