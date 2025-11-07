import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  TextField,
  InputAdornment,
  Autocomplete,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search,
  MoreHoriz,
  CheckCircleOutline,
  CancelOutlined,
} from '@mui/icons-material';
import { StyleOrders } from './StyleOrders';

function OrdersPg() {
  const options = ['All status', 'Finished status'];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyleOrders className="orders">
      <div className="orders-nav">
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Lang</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Lang"
            >
              <MenuItem value={10}>EN</MenuItem>
              <MenuItem value={20}>RU</MenuItem>
              <MenuItem value={30}>UZ</MenuItem>
            </Select>
          </FormControl>
          <div className="profile">
            <p>
              Hello <strong>Behruz</strong>
            </p>
            <Avatar>B</Avatar>
          </div>
        </div>

        <div className="main-header">
          <div className="order-header-text">
            <h2>Your Orders</h2>
            <p>This is your order list data</p>
          </div>
          <div className="order-header-btns">
            <Autocomplete
              options={options}
              sx={{ width: 200, backgroundColor: 'white' }}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </div>
        </div>

        <div className="orders-list">
          <div className="orders-list-nav">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Location</th>
                  <th>Amount</th>
                  <th>Status Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#555231</td>
                  <td>26 March 2020, 12:42 AM</td>
                  <td>Mikasa Ackerman</td>
                  <td>Corner Street 5th London</td>
                  <td>$164.52</td>
                  <td>
                    <Button size="small" variant="contained">
                      New Order
                    </Button>
                  </td>
                  <td>
                    <MoreHoriz
                      onClick={handleClick}
                      style={{ cursor: 'pointer' }}
                    />
                    <Menu
                      anchorEl={anchorEl}
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
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <CheckCircleOutline color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Accept Order" />
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <CancelOutlined color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Reject Order" />
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StyleOrders>
  );
}

export default OrdersPg;
