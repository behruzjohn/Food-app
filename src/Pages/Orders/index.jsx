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
  Chip,
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
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import CheckToken from '../../Components/CheckToken';
import ToastExample from '../../Components/Toast';
import { useTranslation } from 'react-i18next';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import BlenderOutlinedIcon from '@mui/icons-material/BlenderOutlined';
import noOrder from '../../assets/noRemove.png';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import Loader from '../../Components/Loader';

const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput) {
    createOrder(order: $order) {
      payload {
        _id
        address
        createdAt
        createdBy {
          _id
          createdAt
          name
          phone
          photo
          role
          telegramId
          updatedAt
        }
        status
        totalPrice
        updatedAt
      }
    }
  }
`;

const GET_ORDER = gql`
  query GetOrdersByUserId($status: String) {
    getOrdersByUserId(status: $status) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
      }
    }
  }
`;

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatusById($orderId: ID, $status: String) {
    updateOrderStatusById(orderId: $orderId, status: $status) {
      payload {
        _id
        totalPrice
        status
        address
        createdAt
        updatedAt
      }
    }
  }
`;

function OrdersPg() {
  const [openAddOrder, setOpen] = useState(false);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openToastForOrderListError, setOpenToastForOrderListError] =
    useState(false);
  const localToken = JSON.parse(localStorage.getItem('authStore')) || '';
  const role = localToken?.state?.role;
  const [addOrder, { data, loading, error }] = useMutation(CREATE_ORDER);
  const [updateStatus, { data: statusData, loading: loadUptade }] =
    useMutation(UPDATE_ORDER_STATUS);
  const {
    refetch,
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useQuery(GET_ORDER);

  const open = Boolean(anchorEl);

  CheckToken();

  useEffect(() => {
    const search = location?.search;
    if (search) {
      setOpen(true);
    }
  }, []);
  const handleClickStatus = async (status) => {
    setAnchorEl(null);

    try {
      await updateStatus({
        variables: {
          orderId: selectedOrderId,
          status: status,
        },
      });

      refetch();
    } catch (err) {
      setOpenToastForOrderListError(true);
    }
  };

  const handleAddOrder = async (formData) => {
    try {
      await addOrder({
        variables: {
          order: {
            address: [Number(formData.lat), Number(formData.lng)],
          },
        },
      });
    } catch (error) {
      if (error) {
        setOpenToastForOrderListError(true);
      }
    }
  };

  const orders = orderData?.getOrdersByUserId?.payload || [];

  console.log(orders);

  return (
    <HeaderDashborad>
      <Loader load={loading || loadUptade}></Loader>
      <AddOrder
        open={openAddOrder}
        setOpen={setOpen}
        onAdd={handleAddOrder}
      ></AddOrder>
      <StyleOrders className="orders">
        <div className="orders-nav">
          <OrderSearch action="category"></OrderSearch>

          <div className="main-header">
            <div className="order-header-text">
              <h2>{t('orderTitle')}</h2>
              <p>{t('orderDescription')}</p>
            </div>
            <div className="order-header-btns">
              <Button onClick={() => setOpen(true)} variant="contained">
                {t('addOrder')}
              </Button>
            </div>
          </div>

          <div className="orders-list">
            <div className="orders-list-nav">
              <div className="orders-list-scroll">
                {orders && (
                  <table>
                    <thead>
                      <tr>
                        <th>{t('orderId')}</th>
                        <th>{t('data')}</th>
                        <th>{t('customerName')}</th>
                        <th>{t('location')}</th>
                        <th>{t('amount')}</th>
                        <th>{t('statusOrder')}</th>
                        {role === 'admin' ? <th>{t('actions')}</th> : <></>}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((orderItem, orderIndex) => {
                        return (
                          <tr key={orderIndex}>
                            <td>#{orderIndex}</td>
                            <td>
                              {orderItem?.createdAt
                                ? new Date(
                                    orderItem.createdAt
                                  ).toLocaleDateString()
                                : '-'}
                            </td>
                            <td>{orderItem?.createdBy?.name || 'No name'}</td>
                            <td>{orderItem?.address}</td>
                            <td>{orderItem?.totalPrice}</td>
                            <td>
                              <Chip label={orderItem?.status} />
                            </td>
                            {role === 'admin' && (
                              <td>
                                <MoreHoriz
                                  onClick={(e) => {
                                    setSelectedOrderId(orderItem._id);
                                    setAnchorEl(e.currentTarget);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                />
                                <Menu
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={() => setAnchorEl(null)}
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
                                  <MenuItem
                                    onClick={() => handleClickStatus('pending')}
                                  >
                                    <ListItemIcon>
                                      <PendingActionsOutlinedIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('pending')} />
                                  </MenuItem>

                                  <MenuItem
                                    onClick={() => handleClickStatus('cooking')}
                                  >
                                    <ListItemIcon>
                                      <BlenderOutlinedIcon color="error" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('cooking')} />
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleClickStatus('delivering')
                                    }
                                  >
                                    <ListItemIcon>
                                      <LocalShippingOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={t('deleviring')} />
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleClickStatus('received')
                                    }
                                  >
                                    <ListItemIcon>
                                      <TaskAltOutlinedIcon color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('received')} />
                                  </MenuItem>
                                </Menu>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {!orderData?.getOrdersByUserId?.payload && (
                <div className="img-with">
                  <img id="undefind" src={noOrder} alt="No Order Image" />
                </div>
              )}
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
