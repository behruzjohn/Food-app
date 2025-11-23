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
import { useEffect, useState } from 'react';
import { MoreHoriz } from '@mui/icons-material';
import GuardComponent from '../CheckRole/CheckRole';

function CategoryCard({ category, setDeletedCategoryId, setClickedDelete }) {
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);
  const [role, setRole] = useState('');

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('authStore') || '');
    console.log(a?.state?.role);

    setRole(a?.state?.role);
  }, []);

  const handleClick = (event) => {
    setopenOption(event.currentTarget);
  };

  const handleClose = () => {
    setopenOption(null);
  };

  const navigate = useNavigate();
  const handleClickDelete = (id) => {
    setDeletedCategoryId(id);
    setClickedDelete(true);
  };
  return (
    <StyleCategoryCardS className="card">
      <div className="card__content">
        <img
          onClick={() => navigate(`/categoriesById/${category._id}`)}
          src={category?.image !== null ? category?.image : 'pgn.sda'}
          alt={category.name}
        />
        <div onClick={() => navigate(`/categoriesById/${category._id}`)}>
          <h4 style={{ marginTop: 18 }}>{category?.name}</h4>
        </div>
      </div>
      <GuardComponent role={role} section="category" action="delete">
        <MoreHoriz
          style={{ cursor: 'pointer', position: 'relative', bottom: 34 }}
          onClick={handleClick}
        />
        <Menu
          anchorEl={openOption}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: { mt: 1.5, borderRadius: '16px', minWidth: 50, p: 1 },
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
            <DeleteIcon
              style={{ color: 'red' }}
              className="iconDelete"
              onClick={() => handleClickDelete(category?._id)}
              fontSize="small"
            />
          </MenuItem>
        </Menu>
      </GuardComponent>
    </StyleCategoryCardS>
  );
}

export default CategoryCard;
