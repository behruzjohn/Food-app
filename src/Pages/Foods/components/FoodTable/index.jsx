import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatPrice } from '../../../../helpers/formatters';

function FoodTable({ food, handleClickDeleteFood, handleClickEditFood }) {
  const [openOption, setOpenOption] = useState(null);
  const open = Boolean(openOption);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpenOption(event.currentTarget);
  };

  const handleClose = () => setOpenOption(null);

  return (
    <tr>
      <td>
        <img className="food-img" src={food?.image} alt={food?.name} />
      </td>
      <td>{food?.name}</td>
      <td>{food?.description?.slice(0, 100)}</td>
      <td>{food?.category?.name}</td>
      <td style={{ fontFamily: 'sans-serif' }}>{formatPrice(food?.price)}</td>
      <td className="actions">
        <MoreVertIcon className="menu-btn" onClick={handleClick} />

        <Menu
          anchorEl={openOption}
          open={open}
          onClose={handleClose}
          PaperProps={{ elevation: 4 }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => {
              handleClickEditFood(food?._id);
              handleClose();
            }}
            style={{ backgroundColor: 'white' }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClickDeleteFood(food?._id);
              handleClose();
            }}
            style={{ backgroundColor: 'white' }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </td>
    </tr>
  );
}

export default FoodTable;
