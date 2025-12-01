import { Button, Menu, MenuItem } from '@mui/material';
import { StyleFavouriteCard } from './StyleFavouriteCard';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatPrice } from '../../../../helpers/formatters';

function FavouriteCard({ food, handleClickDeleteFood, handleAddToCart }) {
  const { t } = useTranslation();
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);

  const handleClick = (event) => {
    setopenOption(event.currentTarget);
  };
  const handleClose = () => {
    setopenOption(null);
  };

  return (
    <StyleFavouriteCard>
      <div className="card-box">
        <img src={food?.image} alt={food?.name} />
        <div className="texts">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className="div"
          >
            <h3>{food?.name}</h3>
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
          </div>
          <p>{food?.description.slice(0, 95)}</p>
          <p style={{ fontFamily: 'sans-serif', marginTop: 10 }}>
            Price: {formatPrice(food?.price)}
          </p>
          <div className="btn-container">
            <Button
              onClick={() => handleAddToCart(food?._id)}
              id="save"
              variant="contained"
              color="success"
            >
              <span>
                <ShoppingBagOutlinedIcon fontSize="small" />
                {t('addToSavat')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </StyleFavouriteCard>
  );
}
export default FavouriteCard;
