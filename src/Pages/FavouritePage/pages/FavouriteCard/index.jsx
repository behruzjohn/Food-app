import { Button, Menu, MenuItem } from '@mui/material';
import { StyleFavouriteCard } from './StyleFavouriteCard';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatPrice } from '../../../../helpers/formatters';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CREATE_CARD, GET_USER_BY_ID } from '../../api';
import ToastExample from '../../../../Components/Toast/index';
import GuardComponent from '../../../../Components/CheckRole/CheckRole';

function FavouriteCard({
  food,
  quantity,
  handleClickDeleteFood,
  setOpenToastForAddCard,
  isOrderItem,
  checkElement,
  isShopCart,
  user,
}) {
  console.log(quantity);

  const [autoTimeout, setAutoTimeout] = useState(null);
  const { t } = useTranslation();
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);
  const [countQuontity, setQountityCount] = useState(1);
  const [selectedFood, setSelectedFood] = useState(null);
  const [openQuontity, setOpenQuontity] = useState(false);
  const [createCard] = useMutation(CREATE_CARD, {
    onCompleted: () => {
      setOpenToastForAddCard(true);
      setOpenQuontity(false);
      setQountityCount(1);
    },
  });
  const [getUserById, { data: userData }] = useLazyQuery(GET_USER_BY_ID);
  useEffect(() => {
    if (isOrderItem) {
      getUserById({ variables: { userId: user } });
    }
  }, []);

  const handleClick = (event) => {
    setopenOption(event.currentTarget);
  };
  const handleClose = () => {
    setopenOption(null);
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

      setAutoTimeout(null);
    }, 2000);

    setAutoTimeout(timeout);
  };

  return (
    <StyleFavouriteCard>
      <div className="card-box">
        <img src={food?.image} alt={food?.name} />
        <div className="texts">
          <div className="card-nav">
            <h3>{food?.name} </h3>
            {isShopCart ? (
              <MenuItem
                id="delete-menu"
                style={{ backgroundColor: 'white' }}
                onClick={() => {
                  handleClickDeleteFood(food._id);
                  handleClose();
                }}
                sx={{ gap: 1, px: 2 }}
              >
                <DeleteIcon className="removeIcon" fontSize="small" />
                <span id="removeText"> {t('remove')}</span>
              </MenuItem>
            ) : (
              <GuardComponent
                role={checkElement}
                section="favouriteCard"
                action="menu"
              >
                <>
                  <MoreVertIcon
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                    className="optionsMenuIcon"
                  />
                  <Menu
                    anchorEl={openOption}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { mt: 1, borderRadius: '12px', minWidth: 120, p: 0 },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem
                      style={{ backgroundColor: 'white' }}
                      onClick={() => {
                        handleClickDeleteFood(food._id);
                        handleClose();
                      }}
                      sx={{ gap: 1, px: 2 }}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                      {t('remove')}
                    </MenuItem>
                  </Menu>
                </>
              </GuardComponent>
            )}
          </div>
          <p style={{ marginTop: 6 }}>
            {food?.description?.slice(0, 95) ||
              'Literature admiration frequently indulgence announcing are who you her. Was least quick after six. So it yourself repeated together cheerful. Neither it cordial so painful picture studied if. Sex him position doubtful resolved boy expenses. Her engrossed deficient'}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className="amaunt"
          >
            {isOrderItem && (
              <p style={{ fontFamily: 'sans-serif', marginTop: 5 }}>
                <span style={{ color: 'gray' }}>{t('customer')}: </span>
                {userData?.getUserById?.payload?.name}
              </p>
            )}
            {/* {isShopCart && (
              <p style={{ fontFamily: 'sans-serif', marginTop: 5 }}>
                <span style={{ color: 'gray' }}>{t('Quontity')}: </span>
                {quantity}
              </p>
            )} */}

            {isOrderItem && (
              <p style={{ fontFamily: 'sans-serif', marginTop: 12 }}>
                {formatPrice(food?.price * quantity)}
              </p>
            )}
          </div>

          <GuardComponent
            role={checkElement}
            section="favouriteCard"
            action="price"
          >
            <p style={{ fontFamily: 'sans-serif', marginTop: 5 }}>
              <span style={{ color: 'gray' }}>{t('price')}</span>
              {formatPrice(food?.price)}
            </p>
          </GuardComponent>

          <div className="buttons">
            <div className="box-container">
              {openQuontity ? (
                <div className="quontityAdd">
                  <div
                    onClick={() => {
                      startAutoAdd(selectedFood, countQuontity);
                      countQuontity > 1 && setQountityCount((prev) => prev - 1);
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
                <GuardComponent
                  role={checkElement}
                  section="favouriteCard"
                  action="addToCart"
                >
                  <div className="btn">
                    <Button
                      fullWidth
                      onClick={() => handleAddToCart(food?._id)}
                      id="save"
                      variant="contained"
                      color="success"
                    >
                      <span id="span-btn">
                        <ShoppingBagOutlinedIcon
                          className="icon"
                          fontSize="small"
                        />
                        {t('addToSavat')}
                      </span>
                    </Button>
                  </div>
                </GuardComponent>
              )}
            </div>
          </div>
        </div>
      </div>
    </StyleFavouriteCard>
  );
}
export default FavouriteCard;
