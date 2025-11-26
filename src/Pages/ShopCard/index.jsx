import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { useTranslation } from 'react-i18next';
import AddOrder from '../../Components/AddOrder';
import { StyleFoods } from '../Foods/StyleFoods';
import { Button, Container } from '@mui/material';
import undefindImg from '../../assets/nocart.png';
import ToastExample from '../../Components/Toast';
import OrderSearch from '../../Components/OrderSearch';
import ConfirmOrder from '../../Components/OrderConfirm';
import FoodCard from '../../Components/FoodCard/FoodCards';
import { useMutation, useQuery } from '@apollo/client/react';
import HeaderDashborad from '../../Components/HeaderDashboard';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert';
import { CREATE_ORDER, DELETE_CART_ITEM, GET_CARD_FOOD } from './api';

function ShopCart() {
  const { t } = useTranslation();
  const [foods, setFoods] = useState([]);
  const [deletedFoodId, setId] = useState(null);
  const [openAddOrder, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [openToastForAddOrder, setOpenToastForAddOrder] = useState(false);

  const { data, loading, refetch } = useQuery(GET_CARD_FOOD);
  const [deleteCart, { error: deleteFoodError }] =
    useMutation(DELETE_CART_ITEM);
  const [addOrder, { data: addData, error: addErr }] =
    useMutation(CREATE_ORDER);

  useEffect(() => {
    refetch();
  }, []);

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

  useEffect(() => {
    if (data?.getCartItemsByUserId?.payload?.items) {
      setFoods(
        data.getCartItemsByUserId.payload.items.map((item) => ({
          ...item.food,
          quantity: item.quantity,
          cartId: item._id,
          price: item.price,
        }))
      );
      localStorage.setItem(
        'quontityLen',
        data?.getCartItemsByUserId?.payload?.items.length
      );
    }
  }, [data]);

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
