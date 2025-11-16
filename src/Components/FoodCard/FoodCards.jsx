import { Box, Button, Grid, Snackbar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { StyleFoodCard } from './StyleFoodCard';
import defulatFoodImg from '../../assets/23.png';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';
import GuardComponent from '../CheckRole/CheckRole';
import { useTranslation } from 'react-i18next';

function FoodCard({
  isFoodCard,
  handleAddToCart,
  handleClickFavourite,
  isFavourite,
  isSpeacial,
  food,
  handleClickDeleteFood,
  handleClickEditFood,
}) {
  const { t } = useTranslation();
  const [role, setRole] = useState('');

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('authStore') || '');

    setRole(a?.state?.role);
  }, []);
  return (
    <>
      <StyleFoodCard
        isFavourite={isFavourite}
        isSpeacial={isSpeacial}
        isFoodCard={isFoodCard}
        className="card"
      >
        {food?.quantity ? (
          <div
            style={{
              backgroundColor: 'red',
              padding: 15,
              position: 'relative',
              bottom: 15,
              left: 110,
            }}
          >
            <span style={{ color: '#fff' }}>{food.quantity}</span>
          </div>
        ) : null}
        <img src={food?.image ? food.image : defulatFoodImg} alt={food.name} />

        <h2>{food?.name}</h2>
        <p>
          <span>{food?.category?.name}</span> /{food?.name}
        </p>
        <p>{food?.description}</p>
        <p>
          <strong>{t('price')}</strong>
          {food?.price}
        </p>

        <div className="buttons">
          <GuardComponent role={role} section="foodCard" action="edit">
            <div className="btn">
              <Button
                onClick={() => handleClickEditFood(food?._id)}
                id="edit"
                variant="contained"
                color="success"
              >
                <EditSquareIcon fontSize="small" />
              </Button>
              <p>{t('edit')}</p>
            </div>
          </GuardComponent>
          <GuardComponent role={role} section="foodFavourite" action="delete">
            <GuardComponent role={role} section="foodCard" action="delete">
              <div className="btn">
                <Button
                  onClick={() => handleClickDeleteFood(food?._id)}
                  id="delete"
                  variant="contained"
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </Button>
                <p>{t('delete')}</p>
              </div>
            </GuardComponent>
          </GuardComponent>
          <GuardComponent role={role} section="foodCard" action="addFavourite">
            {isFavourite ? (
              <></>
            ) : (
              <div className="btn">
                <Button
                  onClick={() => handleClickFavourite(food?._id)}
                  id="save"
                  variant="contained"
                  color="warning"
                >
                  <AddShoppingCartIcon fontSize="small" />
                </Button>
                <p>{t('addFavourite')}</p>
              </div>
            )}
          </GuardComponent>
          <GuardComponent role={role} section="foodCard" action="addToCard">
            {food?.quantity ? (
              <></>
            ) : (
              <div className="btn">
                <Button
                  onClick={() => handleAddToCart(food?._id)}
                  id="save"
                  variant="contained"
                  color="success"
                >
                  <AddShoppingCartIcon fontSize="small" />
                </Button>
                <p>{t('addToCard')}</p>
              </div>
            )}
          </GuardComponent>
        </div>
      </StyleFoodCard>
    </>
  );
}

export default FoodCard;
