import {
  Box,
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { StyleCategoryCardS } from './StyleCategory';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MoreHoriz } from '@mui/icons-material';

function CategoryCard({ category, setDeletedCategoryId, setClickedDelete }) {
  const options = ['All status', 'Finished status'];
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);

  const handleClick = (event) => {
    setopenOption(event.currentTarget);
  };

  const handleClose = () => {
    setopenOption(null);
  };

  const navigate = useNavigate('');
  const handleClickDelete = (id) => {
    setDeletedCategoryId(id);
    setClickedDelete(true);
  };
  return (
    <StyleCategoryCardS className="card">
      <div className="card__content">
        <img
          onClick={() => navigate(`/categoriesById?id=${category?._id}`)}
          src={category?.image !== null ? category?.image : 'pgn.sda'}
          alt={category.name}
        />
        <div onClick={() => navigate(`/categoriesById?id=${category?._id}`)}>
          <h4>{category?.name}</h4>
        </div>
      </div>
      <MoreHoriz
        onClick={handleClick}
        style={{ cursor: 'pointer', position: 'relative', bottom: 34 }}
      />
      <Menu
        anchorEl={openOption}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: '16px',
            minWidth: 180,
            p: 1,
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <MenuItem id="menu" onClick={handleClose}>
          <div className="btn">
            <Button
              onClick={() => handleClickDelete(category?._id)}
              id="delete"
              variant="contained"
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </Button>
            <p>Delete</p>
          </div>
        </MenuItem>
      </Menu>
    </StyleCategoryCardS>
  );
}

export default CategoryCard;
