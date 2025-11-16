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
import { useLazyQuery, useMutation } from '@apollo/client/react';
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
        }
        orderItems {
          _id
          quantity
          price
          discount
          user
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
  const [oreder, setOrder] = useState([]);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openToastForOrderListError, setOpenToastForOrderListError] =
    useState(false);
  const [fetchAddOrder, { data, loading, error }] = useMutation(CREATE_ORDER);
  const [updateStatus, { data: statusData, loading: loadUptade }] =
    useMutation(UPDATE_ORDER_STATUS);
  const [
    getOrders,
    { data: orderData, loading: orderLoading, error: orderError },
  ] = useLazyQuery(GET_ORDER);

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem('authStore')) || '';
    const token = localToken?.state?.token;
    getOrders({
      variables: {
        page: 1,
        limit: 10,
        statuses: 'All',
      },
      context: {
        headers: { authorization: `Bearer ${token}` },
      },
    });
  }, []);

  const open = Boolean(anchorEl);

  CheckToken();

  const handleClickStatus = async (status) => {
    setAnchorEl(null);

    try {
      const localToken = JSON.parse(localStorage.getItem('authStore')) || '';
      const token = localToken?.state?.token;

      // status update
      await updateStatus({
        variables: {
          orderId: selectedOrderId,
          status: status,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      await getOrders({
        variables: {
          page: 1,
          limit: 10,
          statuses: 'All',
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (err) {
      console.log('Update status error:', err);
      setOpenToastForOrderListError(true);
    }
  };

  const handleAddOrder = async (formData) => {
    try {
      const localToken = JSON.parse(localStorage.getItem('authStore')) || '';
      const token = localToken?.state?.token;
      await fetchAddOrder({
        variables: {
          order: {
            address: [Number(formData.lat), Number(formData.lng)],
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      const { data: refreshedOrders } = await getOrders({
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
  useEffect(() => {
    if (orderData?.getOrders?.payload) {
      setOrder(orderData.getOrders.payload);
    }
  }, [orderData]);

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
          <OrderSearch />

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
              {orderData?.getOrders?.payload && (
                <table>
                  <thead>
                    <tr>
                      <th>{t('orderId')}</th>
                      <th>{t('data')}</th>
                      <th>{t('customerName')}</th>
                      <th>{t('location')}</th>
                      <th>{t('amount')}</th>
                      <th>{t('statusOrder')}</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oreder.map((orderItem, orderIndex) => {
                      console.log(orderItem, 'ds');

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
                            <Button size="small" variant="contained">
                              {orderItem?.status}
                            </Button>
                          </td>
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
                                onClick={() => handleClickStatus('delivering')}
                              >
                                <ListItemIcon>
                                  <LocalShippingOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={t('deleviring')} />
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleClickStatus('received')}
                              >
                                <ListItemIcon>
                                  <TaskAltOutlinedIcon color="success" />
                                </ListItemIcon>
                                <ListItemText primary={t('received')} />
                              </MenuItem>
                            </Menu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {!orderData?.getOrders?.payload && (
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
