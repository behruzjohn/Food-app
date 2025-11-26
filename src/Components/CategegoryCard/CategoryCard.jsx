import { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MoreHoriz } from '@mui/icons-material';
import GuardComponent from '../CheckRole/CheckRole';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyleCategoryCardS } from './StyleCategory';

function CategoryCard({ category, setDeletedCategoryId, setClickedDelete }) {
  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);

  const handleClick = (event) => {
    setopenOption(event.currentTarget);
  };

  const handleClose = () => {
    setopenOption(null);
  };

  const handleClickDelete = (id) => {
    setDeletedCategoryId(id);
    setClickedDelete(true);
  };

  useEffect(() => {
    const stored = localStorage.getItem('authStore');

    const a = JSON.parse(stored || '{}');

    console.log(a?.state?.role);

    setRole(a?.state?.role);
  }, []);
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
