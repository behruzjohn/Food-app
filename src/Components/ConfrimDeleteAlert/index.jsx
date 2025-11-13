import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function DeleteFoodModalAlert({
  open,
  setOpen,
  setIsDeleted,
  onConfirm,
}) {
  const handleClose = () => setOpen(false);

  function handleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
    setIsDeleted(true);
    setOpen(false);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              alignItems: 'center',
            }}
            className="nav"
          >
            <h2>Are you sure?</h2>
            <p>
              Are you sure want to delete this item? This action
              <br />
              cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 15 }} className="btns">
              <Button
                onClick={() => setOpen(false)}
                style={{ width: 120 }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleConfirm()}
                style={{ width: 120 }}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
