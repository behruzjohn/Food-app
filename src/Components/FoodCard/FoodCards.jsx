import { Box, Button, Grid, Snackbar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { StyleFoodCard } from './StyleFoodCard';
import defulatFoodImg from '../../assets/23.png';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function FoodCard({
  handleClickAddToCard,
  isSpeacial,
  food,
  handleClickDeleteFood,
}) {
  return (
    <>
      <StyleFoodCard isSpeacial={isSpeacial} className="card">
        <img src={food?.image ? food.image : defulatFoodImg} alt={food.name} />

        <h2>{food?.name}</h2>
        <p>
          <span>{food?.category?.name}</span> /{food?.name}
        </p>
        <p>{food?.description}</p>
        <p>
          <strong>Price:</strong>
          {food?.price}
        </p>

        <div className="buttons">
          <div className="btn">
            <Button id="edit" variant="contained" color="success">
              <EditSquareIcon fontSize="small" />
            </Button>
            <p>Edit</p>
          </div>

          <div className="btn">
            <Button
              onClick={() => handleClickDeleteFood(food?._id)}
              id="delete"
              variant="contained"
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </Button>
            <p>Delete</p>
          </div>

          <div className="btn">
            <Button
              onClick={() => handleClickAddToCard(food?._id)}
              id="save"
              variant="contained"
              color="secondary"
            >
              <AddShoppingCartIcon fontSize="small" />
            </Button>
            <p>Add to Card</p>
          </div>
        </div>
      </StyleFoodCard>
    </>
  );
}

export default FoodCard;
