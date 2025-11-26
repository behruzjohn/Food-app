import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';

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
        <Box
          className="box"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            width: '90%',
            maxWidth: 400,
            p: 4,
            boxSizing: 'border-box',
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              alignItems: 'center',
              width: '100%',
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
                style={{ width: 140, height: 40 }}
                variant="outlined"
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={() => handleConfirm()}
                style={{ width: 140, height: 40 }}
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
