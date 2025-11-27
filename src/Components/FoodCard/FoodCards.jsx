import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleFoodCard } from './StyleFoodCard';
import defulatFoodImg from '../../assets/23.png';
import DeleteIcon from '@mui/icons-material/Delete';
import GuardComponent from '../CheckRole/CheckRole';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, Grid, Snackbar } from '@mui/material';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatPrice } from '/src/helpers/formatters.js';

function FoodCard({
  isFoodCard,
  handleAddToCart,
  handleClickFavourite,
  handleClickRemoveFav,
  isFavourite,
  isSpeacial,
  buttonsStatus,
  food,
  handleClickDeleteFood,
  handleClickEditFood,
}) {
  const { t } = useTranslation();
  const [role, setRole] = useState('');
  const [isLiked, setLiked] = useState(food?.isFavorite || false);

  useEffect(() => {
    setLiked(food?.isFavorite || false);
  }, [food?.isFavorite]);

  useEffect(() => {
    const stored = localStorage.getItem('authStore');
    const a = JSON.parse(stored || '{}');
    setRole(a?.state?.role);
  }, []);

  return (
    <>
      {food && (
        <StyleFoodCard
          isFavourite={isFavourite}
          isSpeacial={isSpeacial}
          isFoodCard={isFoodCard}
          className="card"
        >
          {food?.quantity ? (
            <div className="quontity">
              <span>{food.quantity}</span>
            </div>
          ) : null}
          <GuardComponent role={role} section="foodCard" action="addFavourite">
            {isSpeacial || isFavourite ? (
              <></>
            ) : (
              <div id="unicBtn" className="btn">
                <h2
                  onClick={() => {
                    if (isLiked) {
                      handleClickRemoveFav(food?._id);
                      setLiked(false);
                    } else {
                      handleClickFavourite(food?._id);
                      setLiked(true);
                    }
                  }}
                >
                  {isLiked ? (
                    <FavoriteIcon color="error" fontSize="medium" />
                  ) : (
                    <FavoriteBorderIcon fontSize="medium" />
                  )}
                </h2>
              </div>
            )}
          </GuardComponent>
          <img
            src={food?.image ? food?.image : defulatFoodImg}
            alt={food?.name}
          />

          <h2>{food?.name}</h2>
          <p style={{ marginLeft: 25 }}>
            {food?.description?.slice(0, 50) + '.'}
          </p>
          <p style={{ fontFamily: 'sans-serif' }}>
            <strong>{t('price')}: </strong>
            {formatPrice(food?.price)}{' '}
            {food?.discount > 0 ? `(${food.discount}%)` : null}
          </p>
          {!buttonsStatus && (
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
              {isFavourite ? (
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
              ) : (
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
              )}

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
          )}
        </StyleFoodCard>
      )}
    </>
  );
}

export default FoodCard;
