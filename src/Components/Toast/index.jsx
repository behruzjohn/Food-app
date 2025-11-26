import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function ToastCompact({ status = 'success', title = '', open, setOpen }) {
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const bgColor =
    status === 'success'
      ? 'linear-gradient(90deg, #56ab2f, #a8e063)'
      : status === 'error'
      ? 'linear-gradient(90deg, #e52d27, #b31217)'
      : 'linear-gradient(90deg, #2193b0, #6dd5ed)';

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        sx={{
          width: 'auto',
          minWidth: 200,
          maxWidth: 350,
          fontSize: 13,
          fontWeight: 500,
          borderRadius: 12,
          background: bgColor,
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0px 3px 10px rgba(0,0,0,0.15)',
          py: 0.5,
          px: 2,
        }}
      >
        {title}
      </Alert>
    </Snackbar>
  );
}

export default ToastCompact;
