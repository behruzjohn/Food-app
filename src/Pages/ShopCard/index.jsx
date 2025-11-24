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
import AddOrder from '../../Components/AddOrder';
import ToastExample from '../../Components/Toast';
import ConfirmOrder from '../../Components/OrderConfirm';
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
const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput) {
    createOrder(order: $order) {
      payload {
        _id
        address
        createdAt
        createdBy {
          _id
          createdAt
          name
          phone
          photo
          role
          telegramId
          updatedAt
        }
        status
        totalPrice
        updatedAt
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
  const [openAddOrder, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openToastForAddOrder, setOpenToastForAddOrder] = useState(false);
  const { data, error, loading, refetch } = useQuery(GET_CARD_FOOD);
  const [deleteCart, { data: deleteData, error: deleteFoodError }] =
    useMutation(DELETE_CART_ITEM);
  const [addOrder, { data: addData, error: addErr }] =
    useMutation(CREATE_ORDER);

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (data?.getCartItemsByUserId?.payload?.items) {
      setFoods(
        data.getCartItemsByUserId.payload.items.map((item) => ({
          ...item.food,
          quantity: item.quantity,
          cartId: item._id,
          // price: (item.price * item.quantity * item.discount) / 100,
          price: item.price,
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
        variables: { food: deletedFoodId },
      });

      setOpenToast(true);
      refetch();
      setClickedDelete(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddOrder = async (formData) => {
    await addOrder({
      variables: {
        order: { address: [Number(formData.lat), Number(formData.lng)] },
      },
    })
      .then((res) => {
        if (res.data?.createOrder?.payload) {
          setOpenToastForAddOrder(true);
          refetch();
        }
      })
      .catch((err) => console.log(err.message));
  };

  const quantity = data?.getCartItemsByUserId?.payload?.items.reduce(
    (total, item) => {
      return (total += item?.quantity);
    },
    0
  );

  return (
    <HeaderDashborad>
      <Loader load={loading}></Loader>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
            quontityLen={data?.getCartItemsByUserId?.payload?.items.length}
            setFoods={setFoods}
            action="category"
            refetchItem={refetch}
          />
          <div className="foods-header">
            <div>
              <h2 style={{ fontFamily: 'sans-serif' }}>
                {t('cartFood')}
                <span style={{ color: 'gray' }}>
                  {' '}
                  , {quantity} {t('product')}
                </span>
              </h2>
              <p>{t('cartDescription')}</p>
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
                <div className="defualtImage">
                  <img id="def" src={undefindImg} alt="Undefined Image" />
                </div>
              )}
            </div>
            {foods.length > 0 && <ConfirmOrder setOpen={setOpen} data={data} />}
          </div>
        </Container>
      </StyleFoods>
      {deleteFoodError?.errors?.length && (
        <ToastExample
          status={'success'}
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
      <AddOrder
        open={openAddOrder}
        setOpen={setOpen}
        onAdd={handleAddOrder}
      ></AddOrder>
      <ToastExample
        title={addData?.createOrder ? t('orderAdded') : addErr?.message}
        open={openToastForAddOrder}
        setOpen={setOpenToastForAddOrder}
      />
    </HeaderDashborad>
  );
}
export default ShopCart;
