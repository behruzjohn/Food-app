import pay from '../../assets/pay.jpg';
import { Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StyleOrderConfirm } from './StyleConfrimOrder';

function ConfirmOrder({ data, setOpen }) {
  const { t } = useTranslation();

  const quantity = data?.getCartItemsByUserId?.payload?.items.reduce(
    (total, item) => {
      return (total += item?.quantity);
    },
    0
  );

  return (
    <StyleOrderConfirm>
      <img src={pay} alt="Payment" />
      <h4 style={{ marginTop: 28 }}>{t('yourOrders')}</h4>
      <div id="container-main">
        <p>
          {t('products')} ({quantity}x)
        </p>
      </div>
      <h4 style={{ marginTop: 10 }}>{t('total')}:</h4>
      <div id="container-main">
        <p>{t('withBehruzCard')}</p>
        <h3>
          <span>
            {new Intl.NumberFormat('uz-UZ', {
              style: 'currency',
              currency: 'UZS',
              minimumFractionDigits: 0,
            }).format(data?.getCartItemsByUserId?.payload?.totalPrice - 10000)}
          </span>
        </h3>
      </div>
      <div id="cart-container">
        <p>{t('withOutBehruzCard')}</p>
        <h5>
          <span>
            {new Intl.NumberFormat('uz-UZ', {
              style: 'currency',
              currency: 'UZS',
              minimumFractionDigits: 0,
            }).format(data?.getCartItemsByUserId?.payload?.totalPrice)}
          </span>
        </h5>
      </div>
      <Button onClick={() => setOpen(true)} variant="contained" color="success">
        {t('placeInHolder')}
      </Button>
    </StyleOrderConfirm>
  );
}
export default ConfirmOrder;
