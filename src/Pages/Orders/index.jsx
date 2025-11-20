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
  Pagination,
} from '@mui/material';
import {
  Search,
  MoreHoriz,
  CheckCircleOutline,
  CancelOutlined,
} from '@mui/icons-material';
import { StyleOrders } from '../../Components/OrderSearch/StyleOrders';
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
import noOrder from '../../assets/noRd.png';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import Loader from '../../Components/Loader';
import { useLocation } from 'react-router-dom';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import { StyleOrder } from './StyleOrder';

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

const GET_ORDER_BY_ID = gql`
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

const GET_ORDER_FOR_ADMIN = gql`
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
          }
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
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openToastForOrderListError, setOpenToastForOrderListError] =
    useState(false);
  const localToken = JSON.parse(localStorage.getItem('authStore')) || '';
  const role = localToken?.state?.role;
  const [addOrder, { data, loading, error }] = useMutation(CREATE_ORDER);
  const [updateStatus, { data: statusData, loading: loadUptade }] =
    useMutation(UPDATE_ORDER_STATUS);
  const [locations, setLocations] = useState({});
  const [page, setPage] = useState(1);

  const [
    getOrderForUser,
    { data: orderData, error: orderError, loading: orderLoading },
  ] = useLazyQuery(GET_ORDER_BY_ID);

  const [
    getOrderForAdmin,
    {
      data: orderDataAdmin,
      error: orderErrorAdmin,
      loading: orderLoadingAdmin,
      refetch,
    },
  ] = useLazyQuery(GET_ORDER_FOR_ADMIN);

  useEffect(() => {
    if (role === 'admin') {
      getOrderForAdmin({
        variables: {
          page: page,
          limit: 10,
        },
      });
    } else {
      getOrderForUser();
    }
  }, [page]);

  const location = useLocation();

  const open = Boolean(anchorEl);

  CheckToken();

  useEffect(() => {
    if (location.state?.openAddOrder) {
      setOpen(true);
    }
  }, [location.state]);

  const handleClickStatus = async (status) => {
    setAnchorEl(null);

    try {
      await updateStatus({
        variables: {
          orderId: selectedOrderId,
          status: status,
        },
      });
      if (role === 'admin') {
        getOrderForAdmin({
          variables: {
            page: 1,
            limit: 10,
          },
        });
      } else {
        getOrderForUser();
      }
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
        console.log(error?.message);
      }
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      if (orderDataAdmin?.getOrders?.payload) {
        setOrders(orderDataAdmin.getOrders.payload);
      }
    } else {
      if (orderData?.getOrdersByUserId?.payload) {
        setOrders(orderData.getOrdersByUserId.payload);
      }
    }
  }, [orderData, orderDataAdmin]);

  useEffect(() => {
    if (role === 'admin') {
      if (!location.state?.openAddOrder) {
        const fetchLocations = async () => {
          const newLocations = {};
          for (const orderItem of orders) {
            if (orderItem.address?.length === 2) {
              const [lat, lng] = orderItem.address;
              try {
                setLoad(true);
                const res = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=uz`
                );
                const data = await res.json();
                newLocations[orderItem._id] = data.display_name;
              } catch {
                newLocations[orderItem._id] = '-';
              } finally {
                setLoad(false);
              }
            } else {
              newLocations[orderItem._id] = '-';
            }
          }
          setLocations(newLocations);
        };

        if (orders.length > 0) fetchLocations();
      }
    }
  }, [data]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <HeaderDashborad>
      <Loader load={loading || loadUptade || load}></Loader>
      <AddOrder
        open={openAddOrder}
        setOpen={setOpen}
        onAdd={handleAddOrder}
      ></AddOrder>
      <StyleOrder className="orders">
        <div className="orders-nav">
          <OrderSearch action="category"></OrderSearch>

          <div className="main-header">
            <div className="order-header-text">
              <h2>
                {role === 'admin' ? t('orderTitleAdmin') : t('orderTitle')}
              </h2>
              <p>
                {role === 'admin' ? t('orderDescAdmin') : t('orderDescription')}
              </p>
            </div>
            <GuardComponent role={role} section="order" action="addOrder">
              <div className="order-header-btns">
                <Button
                  color="success"
                  onClick={() => setOpen(true)}
                  variant="contained"
                >
                  {t('addOrder')}
                </Button>
              </div>
            </GuardComponent>
          </div>

          <div className="orders-list">
            <div className="orders-list-nav">
              <div className="orders-list-scroll">
                {orders.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>{t('orderId')}</th>
                        <th>{t('data')}</th>
                        {role === 'admin' && <th>{t('customerName')}</th>}
                        {role === 'admin' && <th>{t('location')}</th>}
                        <th>{t('amount')}</th>
                        <th>{t('statusOrder')}</th>
                        {role === 'admin' && <th>{t('actions')}</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((orderItem, orderIndex) => (
                        <tr key={orderItem._id}>
                          <td>#{orderIndex + 1}</td>
                          <td>
                            {orderItem.createdAt
                              ? new Date(
                                  orderItem.createdAt
                                ).toLocaleDateString()
                              : '-'}
                          </td>
                          {role === 'admin' && (
                            <td>{orderItem?.createdBy?.name || 'No name'}</td>
                          )}
                          {role === 'admin' && (
                            <td>
                              {locations[orderItem._id]?.slice(0, -13) || '-'}
                            </td>
                          )}

                          <td style={{ fontFamily: 'sans-serif' }}>
                            {new Intl.NumberFormat('uz-UZ', {
                              style: 'currency',
                              currency: 'UZS',
                              minimumFractionDigits: 0,
                            }).format(orderItem.totalPrice)}
                          </td>
                          <td>
                            <Chip
                              label={orderItem.status}
                              color={
                                orderItem.status === 'pending'
                                  ? 'warning'
                                  : orderItem.status === 'cooking'
                                  ? 'error'
                                  : orderItem.status === 'delivering'
                                  ? 'info'
                                  : orderItem.status === 'received'
                                  ? 'success'
                                  : 'default'
                              }
                            />
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
                                    <PendingActionsOutlinedIcon color="warning" />
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
                                    <LocalShippingOutlinedIcon color="primary" />
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
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    className="img-with"
                  >
                    <img
                      style={{ width: 450, height: 450 }}
                      id="undefind"
                      src={noOrder}
                      alt="No Order Image"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </StyleOrder>
      <ToastExample
        status={error?.message ? 'error' : 'success'}
        open={openToastForOrderListError}
        setOpen={error?.message ? setOpenToastForOrderListError : 'true'}
        title={error?.message ? error?.message : t('orderAdded')}
      ></ToastExample>
      {role === 'admin' && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}
        >
          <Pagination
            page={page}
            onChange={handleChange}
            count={10}
            color="primary"
            shape="rounded"
          />
        </div>
      )}
    </HeaderDashborad>
  );
}

export default OrdersPg;
