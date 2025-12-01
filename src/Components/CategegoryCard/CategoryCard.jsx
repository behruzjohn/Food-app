import { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MoreHoriz } from '@mui/icons-material';
import GuardComponent from '../CheckRole/CheckRole';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyleCategoryCardS } from './StyleCategory';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';

function CategoryCard({
  category,
  setDeletedCategoryId,
  setClickedDelete,
  handleClickEdit,
}) {
  const { t } = useTranslation();
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
      <div
        onClick={() => navigate(`/categoriesById/${category._id}`)}
        className="card__content"
      >
        <img src={category?.image} alt={category.name} />
        <div id="title-box">
          <h4>{category?.name}</h4>
        </div>
      </div>

      <GuardComponent role={role} section="category" action="delete">
        <MoreHoriz onClick={handleClick} style={{ cursor: 'pointer' }} />
        <Menu
          anchorEl={openOption}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: { borderRadius: '14px', minWidth: 120 },
          }}
        >
          <MenuItem
            style={{ backgroundColor: 'white' }}
            onClick={() => {
              handleClickEdit(category?._id), handleClose();
            }}
          >
            <EditIcon sx={{ color: 'green', mr: 1 }} />
            {t('edit')}
          </MenuItem>
          <MenuItem
            style={{ backgroundColor: 'white' }}
            onClick={() => {
              handleClickDelete(category?._id);
              handleClose();
            }}
          >
            <DeleteIcon sx={{ color: 'red', mr: 1 }} />
            {t('delete')}
          </MenuItem>
        </Menu>
      </GuardComponent>
    </StyleCategoryCardS>
  );
}

export default CategoryCard;
