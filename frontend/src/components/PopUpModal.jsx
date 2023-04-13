import React from 'react';
import { Modal, Box } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PopUpModal (props) {
  return (
    <Modal
      {...props}
    >
      <Box sx={modalStyle}>
        {props.children}
      </Box>
    </Modal>
  );
}
