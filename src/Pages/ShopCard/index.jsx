import { useEffect, useState } from 'react';
import { StyleFoods } from '../Foods/StyleFoods';
import Loader from '../../Components/Loader';
import HeaderDashborad from '../../Components/HeaderDashboard';
import { Container } from '@mui/material';
import OrderSearch from '../../Components/OrderSearch';
import { gql } from '@apollo/client';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import FoodCard from '../../Components/FoodCard/FoodCards';
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
function ShopCart() {
  const [load, setLoad] = useState(false);
  const [foods, setFoods] = useState([]);
  const [allFoodsForSearch, setAllFoodsForSearch] = useState([]);

  const [getCardFood, { data, error }] = useLazyQuery(GET_CARD_FOOD);

  useEffect(() => {
    getCardFood();
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

  useEffect(() => {
    getCardFood();
  }, []);
  return (
    <HeaderDashborad>
      <Loader load={load}></Loader>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
            quontityLen={data?.getCartItemsByUserId?.payload?.items.length}
            setFoods={setFoods}
            allFoods={allFoodsForSearch}
            action="foods"
          />
          <div className="foods-header">
            <div>
              <h2>Cart Foods</h2>
              <p>Here is your menu summary with graph view</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <h3>
                Total Price: {data?.getCartItemsByUserId?.payload?.totalPrice}
              </h3>
            </div>
          </div>
          <div className="food-cards">
            <div className="food-cards-nav">
              {foods?.map((food) => (
                <FoodCard
                  isFoodCard={true}
                  // handleClickDeleteFood={handleClickDeleteFood}
                  //   handleClickAddToCard={handleClickAddToCard}
                  key={food._id}
                  food={food}
                />
              ))}
            </div>
          </div>
        </Container>
      </StyleFoods>
      {/* <ToastExample
        status={favouriteError?.errors?.length ? 'error' : 'succsess'}
        title={
          favouriteError?.errors?.length
            ? favouriteError?.errors[0]?.message
            : "Yangi Food qo'shildi!"
        }
        open={openToast}
        setOpen={setOpenToast}
      /> */}
      {/* <DeleteFoodModalAlert
        open={clickedDelete}
        setOpen={setClickedDelete}
        setIsDeleted={setIsDeleted}
      /> */}
    </HeaderDashborad>
  );
}
export default ShopCart;
