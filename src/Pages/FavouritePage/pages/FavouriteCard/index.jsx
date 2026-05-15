import { Button, Menu, MenuItem } from "@mui/material";
import { StyleFavouriteCard } from "./StyleFavouriteCard";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { formatPrice } from "../../../../helpers/formatters";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { CREATE_CARD, GET_USER_BY_ID } from "../../api";
import ToastExample from "../../../../Components/Toast/index";
import GuardComponent from "../../../../Components/CheckRole/CheckRole";

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
  const { t } = useTranslation();
  const [autoTimeout, setAutoTimeout] = useState(null);
  const [openOption, setOpenOption] = useState(null);
  const [countQuantity, setCountQuantity] = useState(quantity || 1);
  const [selectedFood, setSelectedFood] = useState(null);
  const [openQuantity, setOpenQuantity] = useState(false);

  const open = Boolean(openOption);

  const [createCard] = useMutation(CREATE_CARD, {
    onCompleted: () => {
      setOpenToastForAddCard(true);
      setOpenQuantity(false);
      setCountQuantity(1);
    },
  });

  const [getUserById, { data: userData }] = useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    if (isOrderItem && user) {
      getUserById({ variables: { userId: user } });
    }
  }, [isOrderItem, user]);

  useEffect(() => {
    if (quantity) setCountQuantity(quantity);
  }, [quantity]);

  const handleMenuOpen = (e) => setOpenOption(e.currentTarget);
  const handleMenuClose = () => setOpenOption(null);

  const startAutoAdd = (foodId, qty) => {
    if (!foodId) return;
    if (autoTimeout) clearTimeout(autoTimeout);
    const timeout = setTimeout(() => {
      createCard({ variables: { data: { food: foodId, quantity: qty } } });
      setAutoTimeout(null);
    }, 2000);
    setAutoTimeout(timeout);
  };

  const handleAddToCart = (foodId) => {
    setSelectedFood(foodId);
    setOpenQuantity(true);
    startAutoAdd(foodId, countQuantity);
  };

  const handleDecrease = () => {
    startAutoAdd(selectedFood, countQuantity);
    if (countQuantity > 1) setCountQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    startAutoAdd(selectedFood, countQuantity);
    setCountQuantity((prev) => prev + 1);
  };

  const truncatedDesc =
    food?.description?.slice(0, 95) ||
    "Delicious food prepared with fresh ingredients.";

  const customerName = userData?.getUserById?.payload?.name;

  return (
    <StyleFavouriteCard>
      <div className="card-box">
        {/* Food image */}
        <div className="img-wrapper">
          <img src={food?.image} alt={food?.name || "Food"} />
        </div>

        {/* Content */}
        <div className="card-content">
          {/* Header row: name + actions */}
          <div className="card-header">
            <h3 className="food-name">
              {food?.name}{" "}
              <span className="price-value">{countQuantity}ta</span>
            </h3>

            {isShopCart ? (
              <button
                className="remove-btn"
                onClick={() => handleClickDeleteFood(food._id)}
                aria-label={t("remove")}
              >
                <DeleteIcon fontSize="small" />
                <span className="remove-label">{t("remove")}</span>
              </button>
            ) : (
              <GuardComponent
                role={checkElement}
                section="favouriteCard"
                action="menu"
              >
                <>
                  <button
                    className="menu-trigger"
                    onClick={handleMenuOpen}
                    aria-label="Options"
                  >
                    <MoreVertIcon fontSize="small" />
                  </button>
                  <Menu
                    anchorEl={openOption}
                    open={open}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 2,
                      sx: { mt: 1, borderRadius: "10px", minWidth: 130, p: 0 },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClickDeleteFood(food._id);
                        handleMenuClose();
                      }}
                      sx={{ gap: 1, px: 2, fontSize: 13, color: "#DC2626" }}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                      {t("remove")}
                    </MenuItem>
                  </Menu>
                </>
              </GuardComponent>
            )}
          </div>

          <p className="food-desc">{truncatedDesc}</p>
          <span className="status">
            {isOrderItem && (
              <div className="order-meta">
                {customerName && (
                  <span className="meta-chip customer-chip">
                    👤 {customerName}
                  </span>
                )}
                {food?.price && quantity && (
                  <span className="meta-chip price-chip">
                    {formatPrice(food.price * quantity)}
                  </span>
                )}
              </div>
            )}
          </span>

          {/* Price */}
          <GuardComponent
            role={checkElement}
            section="favouriteCard"
            action="price"
          >
            <div className="price-row">
              <span className="price-label">{t("price")}</span>
              <span className="price-value">
                {formatPrice(food?.price * food?.quantity)}
              </span>
            </div>
          </GuardComponent>

          {/* Cart controls */}
          <div className="card-footer">
            <div className="controls-wrap">
              {openQuantity ? (
                <div className="qty-control" role="group" aria-label="Quantity">
                  <button
                    className="qty-btn"
                    onClick={handleDecrease}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-num">{countQuantity}</span>
                  <button
                    className="qty-btn"
                    onClick={handleIncrease}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              ) : (
                <GuardComponent
                  role={checkElement}
                  section="favouriteCard"
                  action="addToCart"
                >
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(food?._id)}
                  >
                    <ShoppingBagOutlinedIcon style={{ fontSize: 16 }} />
                    {t("addToSavat")}
                  </button>
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
