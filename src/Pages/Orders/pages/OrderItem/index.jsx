import { CircularProgress, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { GET_ORDER_ITEMS } from '../../api';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client/react';
import { StyleOrderItem } from './StyleOrderItem';
import { formatPrice } from '../../../../helpers/formatters';
import OrderSearch from '../../../../Components/OrderSearch';
import FoodCard from '../../../../Components/FoodCard/FoodCards';
import HeaderDashborad from '../../../../Components/HeaderDashboard';
import FavouriteCard from '../../../FavouritePage/pages/FavouriteCard';
import { GET_USER_BY_ID } from '../../../FavouritePage/api';

function OrderItem() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [userId, setUserId] = useState(null);
  const [location, setLocation] = useState(null);
  const { data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { userId: userId },
  });

  const { data, loading } = useQuery(GET_ORDER_ITEMS, {
    variables: {
      orderId: id,
    },
  });

  const fetchLocations = async () => {
    const address = data?.getOrderById?.payload?.address;

    if (address.length === 2) {
      const [lat, lng] = address;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=uz`
        );
        const data = await res.json();
        setLocation(data?.display_name);
      } catch {
        setLocation('-');
      }
    } else {
      setLocation('-');
    }
  };

  useEffect(() => {
    if (data?.getOrderById?.payload) {
      fetchLocations();
    }
  }, [data]);

  const orderItems = data?.getOrderById?.payload?.orderItems;

  return (
    <HeaderDashborad>
      <Container maxWidth="xl">
        <StyleOrderItem className="order-items">
          <div className="orderItems-nav">
            <OrderSearch action="category"></OrderSearch>
            <div className="category-nav">
              <header>
                <div className="header_nav">
                  <div className="header-text">
                    <h2>
                      {t('orderProduct')}
                      <span style={{ color: 'gray' }}>
                        {' '}
                        ({data?.getOrderById?.payload?.status})
                      </span>
                    </h2>
                    <p style={{ marginTop: 10 }}>
                      <strong>{t('location')}: </strong>
                      {location?.slice(0, -21)}.
                    </p>
                    {/* <p style={{ fontFamily: 'sans-serif', marginTop: 5 }}>
                      <span style={{ color: 'gray' }}>{t('customer')}: </span>
                      {userData?.getUserById?.payload?.name}
                    </p> */}
                  </div>
                  <h3 style={{ fontFamily: 'sans-serif', marginTop: 15 }}>
                    <strong>{t('totalPrice')}: </strong>
                    <span style={{ color: 'green' }}>
                      {formatPrice(data?.getOrderById?.payload?.totalPrice)}
                    </span>
                  </h3>
                </div>
              </header>
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}
                className="card"
              >
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 20,
                      width: '100%',
                    }}
                  >
                    <CircularProgress style={{ marginTop: 180 }} size={50} />
                  </div>
                ) : (
                  orderItems?.map((food) => {
                    setUserId;
                    return (
                      <FavouriteCard
                        quantity={food?.quantity}
                        user={food?.user}
                        isOrderItem={true}
                        key={food?.id}
                        food={food?.food}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </StyleOrderItem>
      </Container>
    </HeaderDashborad>
  );
}
export default OrderItem;
