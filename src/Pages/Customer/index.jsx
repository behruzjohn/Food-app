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
  Container,
} from '@mui/material';
import {
  Search,
  MoreHoriz,
  CheckCircleOutline,
  CancelOutlined,
} from '@mui/icons-material';
import OrderSearch from '../../Components/OrderSearch/index';
import { StyleCustomer } from './StyleCustomer';
import EditSquareIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import HeaderDashborad from '../../Components/HeaderDashboard/index';

function Customer() {
  const options = ['All status', 'Finished status'];
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);

  const handleClick = (event) => {
    setopenOption(event.currentTarget);
  };

  const handleClose = () => {
    setopenOption(null);
  };

  return (
    <HeaderDashborad>
      <StyleCustomer className="orders">
        <div className="orders-nav">
          <OrderSearch />

          <div className="main-header">
            <div className="order-header-text">
              <h2>Your Orders</h2>
              <p>This is your order list data</p>
            </div>
            <div className="order-header-btns">
              <Autocomplete
                options={options}
                sx={{ width: 200, backgroundColor: 'white' }}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            </div>
          </div>

          <div className="orders-list">
            <div className="orders-list-nav">
              <table>
                <thead>
                  <tr>
                    <th>Customer Id</th>
                    <th>Join Date</th>
                    <th>Customer Name</th>
                    <th>Location</th>
                    <th>Total Spent</th>
                    <th>Last Order</th>
                    <th></th>
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
                        $36.35
                      </Button>
                    </td>
                    <td>
                      <MoreHoriz
                        onClick={handleClick}
                        style={{ cursor: 'pointer' }}
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
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <EditSquareIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary="Edit order" />
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <DeleteIcon color="error" />
                          </ListItemIcon>
                          <ListItemText primary="Delete order" />
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </StyleCustomer>
    </HeaderDashborad>
  );
}

export default Customer;
