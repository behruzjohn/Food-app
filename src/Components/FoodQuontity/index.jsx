import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

function FoodQuontity({ open, setOpen, onConfirm }) {
  const { t } = useTranslation();

  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(1);

  const handleClickMinus = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };

  const handleClickPlus = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 style={{ fontWeight: 600, marginBottom: 20 }}>{t('howMuchAdd')}</h2>

        <div
          style={{
            display: 'flex',
            gap: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 25,
          }}
        >
          <button
            onClick={handleClickMinus}
            style={{
              cursor: 'pointer',
              width: 45,
              height: 45,
              borderRadius: '50%',
              backgroundColor: '#ff4d4f',
              border: 'none',
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            -
          </button>

          <input
            value={count}
            readOnly
            style={{
              width: 70,
              height: 45,
              fontSize: 20,
              textAlign: 'center',
              borderRadius: 10,
              border: '1px solid #ccc',
            }}
            type="number"
          />

          <button
            onClick={handleClickPlus}
            style={{
              cursor: 'pointer',
              width: 45,
              height: 45,
              borderRadius: '50%',
              backgroundColor: '#1677ff',
              border: 'none',
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            +
          </button>
        </div>

        <Button
          onClick={() => onConfirm(count)}
          variant="contained"
          color="success"
          sx={{
            width: '100%',
            padding: '10px 0',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {t('add')}
        </Button>
      </Box>
    </Modal>
  );
}

export default FoodQuontity;
