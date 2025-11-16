import React, { useEffect, useState } from 'react';
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
import OrderSearch from '../../Components/OrderSearch/index';
import AddOrder from '../../Components/AddOrder/index';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import CheckToken from '../../Components/CheckToken';
import ToastExample from '../../Components/Toast';
const CREATE_ORDER = gql`
  mutation CreateOrder($address: [Float!]!) {
    createOrder(order: { address: $address }) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
        orderItems {
          _id
          quantity
          price
          discount
          user
          food {
            _id
            shortName
            name
            image
            description
            price
            discount
            likes
            isFavorite
            category {
              _id
              name
              image
            }
          }
        }
        createdBy {
          _id
          name
          phone
          role
          photo
          telegramId
          createdAt
          updatedAt
        }
      }
    }
  }
`;
const GET_ORDER = gql`
  query GetOrders($statuses: String, $page: Int, $limit: Int) {
    getOrders(statuses: $statuses, page: $page, limit: $limit) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
        createdBy {
          _id
          name
          phone
          role
          photo
          telegramId
          createdAt
          updatedAt
        }
      }
    }
  }
`;
function OrdersPg() {
  const [openAddOrder, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openToastForOrderListError, setOpenToastForOrderListError] =
    useState(false);
  const [fetchAddOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useQuery(GET_ORDER);

  useEffect(() => {
    if (orderData) {
      console.log(orderData.getOrders.payload);
    }
  }, [orderData]);

  const open = Boolean(anchorEl);
  CheckToken();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  CheckToken();
  const handleAddOrder = async (formData) => {
    try {
      const localToken = JSON.parse(localStorage.getItem('authStore')) || '';
      const token = localToken?.state?.token;
      await fetchAddOrder({
        variables: {
          address: [Number(formData.lat), Number(formData.lng)],
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (error) {
      if (error) {
        setOpenToastForOrderListError(true);
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderDashborad>
      <AddOrder
        open={openAddOrder}
        setOpen={setOpen}
        onAdd={handleAddOrder}
      ></AddOrder>
      <StyleOrders className="orders">
        <div className="orders-nav">
          <OrderSearch />

          <div className="main-header">
            <div className="order-header-text">
              <h2>Your Orders</h2>
              <p>This is your order list data</p>
            </div>
            <div className="order-header-btns">
              <Button onClick={() => setOpen(true)} variant="contained">
                Add Order
              </Button>
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
      <ToastExample
        status={'error'}
        open={openToastForOrderListError}
        setOpen={setOpenToastForOrderListError}
        title={error ? error.message : ''}
      ></ToastExample>
    </HeaderDashborad>
  );
}

export default OrdersPg;
