import { useEffect, useState } from 'react';
import { StyleFoods } from '../Foods/StyleFoods';
import Loader from '../../Components/Loader';
import HeaderDashborad from '../../Components/HeaderDashboard';
import { Container } from '@mui/material';
import OrderSearch from '../../Components/OrderSearch';
import { gql } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import FoodCard from '../../Components/FoodCard/FoodCards';
const GET_ALL_FAVOURITE_FOODS = gql`
  query GetFavoriteFoods {
    getFavoriteFoods {
      payload {
        _id
        shortName
        name
        image
        description
        price
        discount
        likes
        isFavorite
        category {
          _id
          name
          image
        }
      }
    }
  }
`;
function FavouriteFood() {
  const [load, setLoad] = useState(false);
  const [foods, setFoods] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [allFoodsForSearch, setAllFoodsForSearch] = useState([]);

  const [getAllFavouriteFoods, { data, error }] = useLazyQuery(
    GET_ALL_FAVOURITE_FOODS
  );

  useEffect(() => {
    setLoad(true);
    getAllFavouriteFoods();
    if (data?.getFavoriteFoods?.payload) {
      setFoods(data?.getFavoriteFoods?.payload);
      setLoad(false);
    }
    setAllFoodsForSearch(data?.getFavoriteFoods?.payload);
  }, [data]);
  return (
    <HeaderDashborad>
      <Loader load={load}></Loader>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
            setFoods={setFoods}
            allFoods={allFoodsForSearch}
            action="foods"
          />
          <div className="foods-header">
            <div>
              <h2>Favourite Foods</h2>
              <p>Here is your menu summary with graph view</p>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 15 }}
            ></div>
          </div>
          <div className="food-cards">
            <div className="food-cards-nav">
              {foods?.map((food) => (
                <FoodCard
                  isFavourite={true}
                  //   handleClickDeleteFood={handleClickDeleteFood}
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
export default FavouriteFood;
