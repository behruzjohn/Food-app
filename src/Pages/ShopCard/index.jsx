import { useEffect, useState } from 'react';
import { StyleFoods } from '../Foods/StyleFoods';
import Loader from '../../Components/Loader';
import HeaderDashborad from '../../Components/HeaderDashboard';
import { Button, Container } from '@mui/material';
import OrderSearch from '../../Components/OrderSearch';
import { gql } from '@apollo/client';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import FoodCard from '../../Components/FoodCard/FoodCards';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
import undefindImg from '../../assets/nocart.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const GET_CARD_FOOD = gql`
  query GetCartItemsByUserId {
    getCartItemsByUserId {
      payload {
        totalPrice
        items {
          _id
          quantity
          price
          discount
          user
          food {
            _id
            shortName
            name
            image
            description
            price
            discount
            likes
            isFavorite
          }
        }
      }
    }
  }
`;
const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($food: ID) {
    deleteCartItem(food: $food) {
      payload {
        _id
        quantity
        price
        discount
        user
      }
    }
  }
`;
function ShopCart() {
  const { t } = useTranslation();
  const navigate = useNavigate('');
  const [foods, setFoods] = useState([]);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [deletedFoodId, setId] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const { data, error, loading, refetch } = useQuery(GET_CARD_FOOD);
  const [deleteCart, { data: deleteData, error: deleteFoodError }] =
    useMutation(DELETE_CART_ITEM);

  useEffect(() => {
    if (data?.getCartItemsByUserId?.payload?.items) {
      setFoods(
        data.getCartItemsByUserId.payload.items.map((item) => ({
          ...item.food,
          quantity: item.quantity,
          cartId: item._id,
          price: (item.price * item.quantity * item.discount) / 100,
        }))
      );
      localStorage.setItem(
        'quontityLen',
        data?.getCartItemsByUserId?.payload?.items.length
      );
    }
  }, [data]);

  const handleClickDeleteFood = (clickedFoodId) => {
    setId(clickedFoodId);
    setClickedDelete(true);
  };

  const handleClickDelete = async () => {
    try {
      await deleteCart({
        variables: { foodId: deletedFoodId },
      });

      setOpenToast(true);
      refetch();
      setClickedDelete(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <HeaderDashborad>
      <Loader load={loading}></Loader>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
            quontityLen={data?.getCartItemsByUserId?.payload?.items.length}
            setFoods={setFoods}
            action="foods"
            refetchItem={refetch}
          />
          <div className="foods-header">
            <div>
              <h2>{t('cartFood')}</h2>
              <p>{t('cartDescription')}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <h3>
                {t('totalPrice')}
                {data?.getCartItemsByUserId?.payload?.totalPrice}
              </h3>
            </div>
          </div>
          <div className="food-cards">
            <div className="food-cards-nav">
              {foods.length ? (
                foods?.map((food) => (
                  <FoodCard
                    isFavourite={true}
                    isFoodCard={true}
                    handleClickDeleteFood={handleClickDeleteFood}
                    key={food._id}
                    food={food}
                  />
                ))
              ) : (
                <div className="img-with">
                  <img id="undefind" src={undefindImg} alt="Undefined Image" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </StyleFoods>
      {deleteFoodError?.errors?.length && (
        <ToastExample
          status={'succsess'}
          title={t('foodIsDeleted')}
          open={openToast}
          setOpen={setOpenToast}
        />
      )}
      <DeleteFoodModalAlert
        open={clickedDelete}
        setOpen={setClickedDelete}
        onConfirm={handleClickDelete}
      />
      <div
        style={{ display: 'flex', justifyContent: 'end', marginTop: 30 }}
        className="placeAnOrder"
      >
        <Button
          onClick={() => navigate('/order-list?1')}
          style={{
            marginRight: 20,
          }}
          color="success"
          variant="contained"
        >
          Place an order
        </Button>
      </div>
    </HeaderDashborad>
  );
}
export default ShopCart;
