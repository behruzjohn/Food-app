import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import { useTranslation } from 'react-i18next';
import { StyleFoods } from '../Foods/StyleFoods';
import ToastExample from '../../Components/Toast';
import undefindImg from '../../assets/noFound.png';
import OrderSearch from '../../Components/OrderSearch';
import FoodQuontity from '../../Components/FoodQuontity';
import FoodCard from '../../Components/FoodCard/FoodCards';
import { useMutation, useQuery } from '@apollo/client/react';
import HeaderDashborad from '../../Components/HeaderDashboard';
import DeleteFoodModalAlert from '../../Components/ConfrimDeleteAlert/index';
import {
  CREATE_CARD,
  DELETE_FOOD_FROM_FAVOURITES,
  GET_ALL_FAVOURITE_FOODS,
} from './api';

function FavouriteFood() {
  const { t } = useTranslation();
  const [foods, setFoods] = useState([]);
  const [openQuontity, setOpenQuontity] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [openToastForAddCard, setOpenToastForAddCard] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [allFoodsForSearch, setAllFoodsForSearch] = useState([]);
  const [createCard] = useMutation(CREATE_CARD);
  const [deleteFoodById, { data: deleteFavData, error: deleteFoodError }] =
    useMutation(DELETE_FOOD_FROM_FAVOURITES);
  const [deletedFoodId, setId] = useState(null);

  const { data, loading, refetch } = useQuery(GET_ALL_FAVOURITE_FOODS, {
    fetchPolicy: 'network-only',
  });

  const handleClickDeleteFood = (clickedFoodId) => {
    setId(clickedFoodId);
    setClickedDelete(true);
  };

  const handleClickDelete = async () => {
    try {
      await deleteFoodById({
        variables: { foodId: deletedFoodId },
      });
      setOpenToast(true);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = (food) => {
    setSelectedFood(food);
    setOpenQuontity(true);
  };

  const handleConfirmQuontity = (quontity) => {
    createCard({
      variables: {
        data: {
          food: selectedFood,
          quantity: quontity,
        },
      },
    });

    setOpenQuontity(false);
    setSelectedFood(null);
    setOpenToastForAddCard(true);
  };

  useEffect(() => {
    if (data?.getFavoriteFoods?.payload) {
      setFoods(data.getFavoriteFoods.payload);
      setAllFoodsForSearch(data.getFavoriteFoods.payload);
    }
  }, [data]);

  useEffect(() => {
    if (deleteFavData?.removeFoodFromFavorites?.payload) {
      setClickedDelete(false);
    }
  }, [deleteFavData]);

  return (
    <HeaderDashborad>
      <Loader load={loading}></Loader>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch
            setFoods={setFoods}
            allFoods={allFoodsForSearch}
            action="category"
          />
          <div className="foods-header">
            <div className="text">
              <h2>{t('favouriteFoodTitle')}</h2>
              <p>{t('favouriteDesc')}</p>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 15 }}
            ></div>
          </div>
          <div className="food-cards">
            <div className="food-cards-nav">
              {foods.length ? (
                foods.map((food) => (
                  <FoodCard
                    getAllFavouriteFoods={refetch}
                    isFavourite={true}
                    handleClickDeleteFood={handleClickDeleteFood}
                    handleAddToCart={handleAddToCart}
                    key={food._id}
                    food={food}
                  />
                ))
              ) : (
                <div className="defualtImage">
                  <img src={undefindImg} alt="Undefined Image" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </StyleFoods>
      {deleteFoodError && (
        <ToastExample
          status="error"
          title="Error deleting food!"
          open={openToast}
          setOpen={setOpenToast}
        />
      )}

      <ToastExample
        status="success"
        title={t('addedNewCartFood')}
        open={openToastForAddCard}
        setOpen={setOpenToastForAddCard}
      ></ToastExample>
      <DeleteFoodModalAlert
        onConfirm={handleClickDelete}
        open={clickedDelete}
        setOpen={setClickedDelete}
      />
      <FoodQuontity
        onConfirm={handleConfirmQuontity}
        open={openQuontity}
        setOpen={setOpenQuontity}
      ></FoodQuontity>
    </HeaderDashborad>
  );
}
export default FavouriteFood;
