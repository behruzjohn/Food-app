import { Box, Button, Modal } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
  width: 360,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

function SentCode({ setOpen, setCode, handleClickConfirm, confirmError }) {
  const { t } = useTranslation();

  return (
    <div className="modal">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
          >
            <ClearOutlinedIcon />
          </div>
          <h2 style={{ margin: 0, color: '#ff9800' }}>{t('weSentSms')}</h2>

          <p style={{ color: '#555', fontSize: 14 }}>{t('smsDesc')}</p>

          <div
            style={{ display: 'flex', alignItems: 'center', gap: 15 }}
            className="modal-text"
          >
            <input
              onChange={(e) => setCode(e.target.value)}
              style={{
                height: 35,
                borderRadius: 4,
                marginTop: 18,
                paddingLeft: 10,
              }}
              type="number"
              placeholder="Enter code..."
              className="sms-input"
            />
            <Button
              onClick={() => handleClickConfirm()}
              variant="contained"
              color="success"
              sx={{
                borderRadius: '7px',
                mt: 2,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              {t('confirm')}
            </Button>
          </div>
          {confirmError && (
            <p style={{ color: 'red', marginTop: '10px', fontSize: '13px' }}>
              {confirmError}
            </p>
          )}
        </Box>
      </Modal>
    </div>
  );
}
export default SentCode;
