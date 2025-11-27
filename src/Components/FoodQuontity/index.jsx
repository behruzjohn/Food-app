import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Modal } from '@mui/material';
import StyleFoodQuontity from './StyleFoodQuontity';
import StyleFoodQuantity from './StyleFoodQuontity';

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
  const [count, setCount] = useState(1);

  const handleClose = () => setOpen(false);

  const handleClickMinus = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const handleClickPlus = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div style={{ padding: 20 }}>
      <Modal open={open} onClose={handleClose}>
        <StyleFoodQuantity>
          <Box className="box" sx={style}>
            <div
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
            >
              <CloseIcon />
            </div>
            <h2 id="box-h2">{t('howMuchAdd')}</h2>

            <div className="btn-dev">
              <button id="minusBtn" onClick={handleClickMinus}>
                -
              </button>
              <input value={count} readOnly type="number" />
              <button id="plusBtn" onClick={handleClickPlus}>
                +
              </button>
            </div>

            <Button
              id="addBtn"
              onClick={() => onConfirm(count)}
              variant="contained"
              color="success"
            >
              {t('add')}
            </Button>
          </Box>
        </StyleFoodQuantity>
      </Modal>
    </div>
  );
}

export default FoodQuontity;
