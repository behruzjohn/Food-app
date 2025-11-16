import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
            <h2>{t('areYouSure')}</h2>
            <p>
              {t('areYouDescription')}
              {t('areYouDescription2')}
            </p>
            <div style={{ display: 'flex', gap: 15 }} className="btns">
              <Button
                onClick={() => setOpen(false)}
                style={{ width: 120 }}
                variant="outlined"
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={() => handleConfirm()}
                style={{ width: 120 }}
                color="error"
                variant="contained"
              >
                {t('delete')}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
