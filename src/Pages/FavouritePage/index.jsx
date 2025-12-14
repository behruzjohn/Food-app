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
import FavouriteCard from './pages/FavouriteCard';

function FavouriteFood() {
  const { t } = useTranslation();
  const [foods, setFoods] = useState([]);
  const [openQuontity, setOpenQuontity] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [openToastForAddCard, setOpenToastForAddCard] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [deleteFoodById, { data: deleteFavData, error: deleteFoodError }] =
    useMutation(DELETE_FOOD_FROM_FAVOURITES);
  const [deletedFoodId, setId] = useState(null);

  const { data, refetch } = useQuery(GET_ALL_FAVOURITE_FOODS, {
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

  useEffect(() => {
    const fetchFavouriteFood = async () => {
      const { data } = await refetch();
      if (data?.getFavoriteFoods?.payload) {
        setFoods(data.getFavoriteFoods.payload);
      }
    };
    fetchFavouriteFood();
  }, [data]);

  useEffect(() => {
    if (deleteFavData?.removeFoodFromFavorites?.payload) {
      setClickedDelete(false);
    }
  }, [deleteFavData]);

  return (
    <HeaderDashborad>
      <StyleFoods className="foods">
        <Container maxWidth="xl">
          <OrderSearch setFoods={setFoods} action="category" />
          <div className="foods-header">
            <div className="text">
              <h2>{t('favouriteFoodTitle')}</h2>
            </div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 15 }}
            ></div>
          </div>
          <div className="food-cards">
            <div className="food-cards-navs">
              {foods?.length ? (
                foods?.map((foodItem) => (
                  <FavouriteCard
                    checkElement="admin"
                    setOpenToastForAddCard={setOpenToastForAddCard}
                    handleClickDeleteFood={handleClickDeleteFood}
                    key={foodItem._id}
                    food={foodItem}
                  />
                ))
              ) : (
                <div className="defualtImage">
                  <img
                    src={undefindImg}
                    alt="Behruz Restaurant no undefind image"
                  />
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

      <DeleteFoodModalAlert
        onConfirm={handleClickDelete}
        open={clickedDelete}
        setOpen={setClickedDelete}
      />

      <ToastExample
        status="success"
        title={t('addedNewCartFood')}
        open={openToastForAddCard}
        setOpen={setOpenToastForAddCard}
      ></ToastExample>
    </HeaderDashborad>
  );
}
export default FavouriteFood;
