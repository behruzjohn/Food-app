import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleFoodCard } from './StyleFoodCard';
import defulatFoodImg from '../../assets/23.png';
import DeleteIcon from '@mui/icons-material/Delete';
import GuardComponent from '../CheckRole/CheckRole';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, Grid, Menu, MenuItem, Snackbar } from '@mui/material';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { formatPrice } from '/src/helpers/formatters.js';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { MoreHoriz } from '@mui/icons-material';
import ToastExample from '../../Components/Toast/index';
import { useMutation } from '@apollo/client/react';
import { CREATE_CARD } from '../../Pages/Foods/api';

function FoodCard({
  isFoodCard,
  handleClickFavourite,
  handleClickRemoveFav,
  isFavourite,
  isSpeacial,
  buttonsStatus,
  food,
  handleClickDeleteFood,
  handleClickEditFood,
  setOpenToastForAddCard,
}) {
  const { t } = useTranslation();
  const [role, setRole] = useState('');
  const [isLiked, setLiked] = useState(food?.isFavorite || false);
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);
  const [countQuontity, setQountityCount] = useState(1);
  const [openQuontity, setOpenQuontity] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [createCard, { data: addToCardData }] = useMutation(CREATE_CARD);
  const [autoTimeout, setAutoTimeout] = useState(null);

  const handleClose = () => {
    setopenOption(null);
  };

  const handleClick = (event) => {
    setopenOption(event.currentTarget);
  };

  const handleAddToCart = (food) => {
    setSelectedFood(food);
    setOpenQuontity(true);
    startAutoAdd(food, countQuontity);
  };

  const startAutoAdd = (food, quantity) => {
    if (!food) return;

    if (autoTimeout) clearTimeout(autoTimeout);

    const timeout = setTimeout(() => {
      createCard({
        variables: {
          data: {
            food: food,
            quantity: quantity,
          },
        },
      });

      setOpenQuontity(false);
      setQountityCount(1);
      setAutoTimeout(null);
      setOpenToastForAddCard(true);
    }, 2000);
    if (addToCardData?.createCartItem?.payload) {
      setOpenToastForAddCard(true);
    }

    setAutoTimeout(timeout);
  };

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
          <div className="imageWrapper">
            {food?.quantity && (
              <div className="quontity">
                <span>{food.quantity}</span>
              </div>
            )}

            <GuardComponent role={role} section="foodCard" action="delete">
              <MoreHoriz onClick={handleClick} className="optionsMenuIcon" />
              <Menu
                anchorEl={openOption}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 3,
                  sx: { mt: 1, borderRadius: '12px', minWidth: 120, p: 0 },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem
                  style={{ backgroundColor: 'white' }}
                  onClick={() => {
                    handleClickDeleteFood(food?._id);
                    handleClose();
                  }}
                  sx={{ gap: 1, px: 2 }}
                >
                  <DeleteIcon fontSize="small" color="error" />
                  {t('delete')}
                </MenuItem>
              </Menu>
            </GuardComponent>

            <GuardComponent
              role={role}
              section="foodCard"
              action="addFavourite"
            >
              {isSpeacial || isFavourite ? null : (
                <div id="unicBtn">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
                      <FavoriteIcon color="error" fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </button>
                </div>
              )}
            </GuardComponent>

            <img src={food?.image || defulatFoodImg} alt={food?.name} />
          </div>

          <h2>{food?.name}</h2>
          <p style={{ marginLeft: 25 }}>
            {food?.description?.slice(0, 50) + '.'}
          </p>
          <p style={{ fontFamily: 'sans-serif', marginTop: 15 }}>
            <strong>{t('price')} </strong>
            {formatPrice(food?.price)}{' '}
            {food?.discount > 0 ? `(${food.discount}%)` : null}
          </p>
          {!buttonsStatus && (
            <div style={{ marginTop: 15 }} className="buttons">
              <GuardComponent role={role} section="foodCard" action="edit">
                <div className="btn">
                  <Button
                    fullWidth
                    startIcon={<EditSquareIcon fontSize="small" />}
                    onClick={() => handleClickEditFood(food?._id)}
                    id="edit"
                    variant="contained"
                    color="success"
                  >
                    {t('edit')}
                  </Button>
                </div>
              </GuardComponent>
              {isFavourite && (
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
              )}

              <GuardComponent role={role} section="foodCard" action="addToCard">
                {openQuontity ? (
                  <div className="quontityAdd">
                    <div
                      onClick={() => {
                        startAutoAdd(selectedFood, countQuontity);
                        countQuontity > 1 &&
                          setQountityCount((prev) => prev - 1);
                      }}
                      className="minus"
                    >
                      <p>-</p>
                    </div>
                    <p>{countQuontity}</p>
                    <div
                      onClick={() => {
                        startAutoAdd(selectedFood, countQuontity);
                        setQountityCount((prev) => prev + 1);
                      }}
                      className="plus"
                    >
                      <p>+</p>
                    </div>
                  </div>
                ) : (
                  <div className="btn">
                    <Button
                      fullWidth
                      onClick={() => handleAddToCart(food?._id)}
                      id="save"
                      variant="contained"
                      color="success"
                    >
                      <span id="btn-span">
                        <ShoppingBagOutlinedIcon fontSize="small" />
                        {t('addToSavat')}
                      </span>
                    </Button>
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
