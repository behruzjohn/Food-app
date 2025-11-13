import {
  Avatar,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { StyleOrders } from '../../Pages/Orders/StyleOrders';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import { useNavigate } from 'react-router-dom';

function OrderSearch() {
  const [open, setopen] = useState(null);
  const naivagte = useNavigate('');
  const name = localStorage.getItem('userName') || '';
  const upperCaseName = name[0].toUpperCase();

  const handleAvatarClick = (event) => {
    setopen(event.currentTarget);
  };
  const handleClose = () => {
    setopen(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    naivagte('/sign-in');
    handleClose();
  };

  const handleChangePassword = () => {
    naivagte('/forgotPass');
    handleClose();
  };
  return (
    <StyleOrders>
      <div className="orders-search">
        <TextField
          type="text"
          placeholder="Search here"
          style={{ backgroundColor: 'white' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <div className="profile">
          <p>
            Hello <strong>{name}</strong>
          </p>
          <Avatar onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
            {upperCaseName}
          </Avatar>
          <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon>
                <PasswordIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography>Change Password</Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText>
                <Typography color="error">Log out</Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </StyleOrders>
  );
}
export default OrderSearch;
