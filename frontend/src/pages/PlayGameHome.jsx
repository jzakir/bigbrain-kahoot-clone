import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import WhiteBox from '../components/WhiteBox';
import GradientButton from '../components/GradientButton';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import PopUpModal from '../components/PopUpModal';
import PrimaryButton from '../components/PrimaryButton';

export default function PlayGameHome () {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);

  const [name, setName] = React.useState('');
  const [pin, setPin] = React.useState(urlParams.get('sessionId'));
  const [errorModal, setErrorModal] = React.useState(false);

  const handleJoin = () => {
    axios.post(`/play/join/${pin}/`, { name })
      .then(data => {
        navigate(`/play/join/${pin}/${data.data.playerId}`)
      })
      .catch(setErrorModal(true));
  }

  return (
    <>
      <WhiteBox>
        <Typography variant='h2' sx={{ fontWeight: 'bold' }}>Play A Game!</Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
          <TextField required label="Name" variant="filled"
                     onChange={(e) => setName(e.target.value)}/>
          <TextField required label="Game PIN" variant="filled"
                     defaultValue={urlParams.get('sessionId')}
                     onChange={(e) => setPin(e.target.value)}/>
          <GradientButton sx={{ mt: 3 }} onClick={handleJoin}>Join!</GradientButton>
        </Box>
      </WhiteBox>
      <PopUpModal
        open={errorModal}
        onClose={() => setErrorModal(false)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4">
            Error!
          </Typography>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Invalid Game Session PIN
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <PrimaryButton onClick={() => setErrorModal(false)} sx={{ width: '100px', mt: 3 }}>
              Close
            </PrimaryButton>
          </Box>
        </Box>
      </PopUpModal>
    </>
  )
}
