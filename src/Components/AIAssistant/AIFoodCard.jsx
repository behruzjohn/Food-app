import { useState } from "react";
import { FoodCardWrap } from "./StyleAIAssistant";
import { formatPrice } from "../../helpers/formatters";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

function AIFoodCard({ food, onAddToCart }) {
  const { t } = useTranslation();

  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (added || loading) return;
    setLoading(true);
    const ok = await onAddToCart(food._id);
    setLoading(false);
    if (ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  };

  return (
    <FoodCardWrap>
      <img
        src={food.image}
        alt={food.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150x90?text=Food";
        }}
      />
      <div className="food-info">
        <div className="food-name">{food.name}</div>
        <div className="food-category">{food.category?.name}</div>
        <div className="food-price">{formatPrice(food.price)} so'm</div>
      </div>
      <button className={`add-btn ${added ? "added" : ""}`} onClick={handleAdd}>
        {added ? (
          <>
            <CheckIcon sx={{ fontSize: 13 }} /> {t("aiAdded")}
          </>
        ) : (
          <>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 13 }} />{" "}
            {t("aiAddToCart")}
          </>
        )}
      </button>
    </FoodCardWrap>
  );
}

export default AIFoodCard;
