import React, { useState } from 'react';
import { Snackbar, Alert, Button } from '@mui/material';

function ToastExample({ title, open, setOpen }) {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {title}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ToastExample;
