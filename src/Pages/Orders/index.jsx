import React, { useEffect, useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Pagination,
  Container,
  CircularProgress,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { StyleOrders } from '../../Components/OrderSearch/StyleOrders';
import OrderSearch from '../../Components/OrderSearch/index';
import AddOrder from '../../Components/AddOrder/index';
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
import { useLocation, useNavigate } from 'react-router-dom';
import GuardComponent from '../../Components/CheckRole/CheckRole';
import { StyleOrder } from './StyleOrder';
import { formatPrice } from '../../helpers/formatters';
import {
  CREATE_ORDER,
  GET_ORDER_BY_ID,
  GET_ORDER_FOR_ADMIN,
  UPDATE_ORDER_STATUS,
} from './api';
import { lime } from '@mui/material/colors';

function OrdersPg() {
  const { t } = useTranslation();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [orders, setOrders] = useState([]);
  const [locations, setLocations] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddOrder, setOpenAddOrder] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openToastForOrderListError, setOpenToastForOrderListError] =
    useState(false);
  const localToken = JSON.parse(localStorage.getItem('authStore')) || '';
  const role = localToken?.state?.role;

  const open = Boolean(anchorEl);
  const [addOrder, { loading, error }] = useMutation(CREATE_ORDER);
  const [updateStatus, { loading: loadUptade }] =
    useMutation(UPDATE_ORDER_STATUS);
  const { data: orderData, refetch: getOrderForUser } = useQuery(
    GET_ORDER_BY_ID,
    {
      variables: {
        page: page,
        limit: 10,
      },
      fetchPolicy: 'network-only',
    }
  );
  const { data: orderDataAdmin, refetch: getOrderForAdmin } = useQuery(
    GET_ORDER_FOR_ADMIN,
    {
      variables: {
        page: page,
        limit: 10,
      },
      fetchPolicy: 'network-only',
    }
  );
  const navigate = useNavigate('');

  useEffect(() => {
    if (role === 'admin') {
      getOrderForAdmin();
    } else {
      getOrderForUser();
    }
  }, [page]);

  useEffect(() => {
    if (location.state?.openAddOrder) {
      setOpenAddOrder(true);
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
        getOrderForUser({
          variables: {
            page: page,
            limit: 10,
          },
        });
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
  }, [orders]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <HeaderDashborad>
      {/* <Loader load={loading || loadUptade || load}></Loader> */}
      <AddOrder
        open={openAddOrder}
        setOpen={setOpenAddOrder}
        onAdd={handleAddOrder}
      ></AddOrder>
      <StyleOrder className="orders">
        <Container maxWidth="xl">
          <div className="orders-nav">
            <OrderSearch action="category"></OrderSearch>

            <div className="main-header">
              <div className="order-header-text">
                <h2>
                  {role === 'admin' ? t('orderTitleAdmin') : t('orderTitle')}
                </h2>
                <p>
                  {role === 'admin'
                    ? t('orderDescAdmin')
                    : t('orderDescription')}
                </p>
              </div>
              <GuardComponent role={role} section="order" action="addOrder">
                <div className="order-header-btns">
                  <Button
                    color="success"
                    onClick={() => setOpenAddOrder(true)}
                    variant="contained"
                  >
                    {t('addOrder')}
                  </Button>
                </div>
              </GuardComponent>
            </div>

            <div style={{ marginTop: 40 }} className="orders-list">
              <div className="orders-list-nav">
                <div
                  className="orders-list-scroll"
                  style={{ position: 'relative', overflowX: 'auto' }}
                >
                  {load || loading || loadUptade ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 20,
                      }}
                    >
                      <CircularProgress style={{ marginTop: 180 }} size={50} />
                    </div>
                  ) : orders.length > 0 ? (
                    <table
                      style={{ width: '100%', borderCollapse: 'collapse' }}
                    >
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
                          <tr
                            onClick={() =>
                              navigate(`orderItems/${orderItem._id}`)
                            }
                            key={orderItem._id}
                          >
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
                              <td>{locations[orderItem._id] || '-'}</td>
                            )}
                            <td style={{ fontFamily: 'sans-serif' }}>
                              {formatPrice(orderItem?.totalPrice)}
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
                                  onClick={(e) =>
                                    setAnchorEl({
                                      [orderItem._id]: e.currentTarget,
                                    })
                                  }
                                  style={{ cursor: 'pointer' }}
                                />
                                <Menu
                                  anchorEl={anchorEl?.[orderItem._id] || null}
                                  open={Boolean(anchorEl?.[orderItem._id])}
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
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="defualtImage">
                      <img src={noOrder} alt="No Order" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </StyleOrder>
      <ToastExample
        status={error?.message ? 'error' : 'success'}
        open={openToastForOrderListError}
        setOpen={error?.message ? setOpenToastForOrderListError : 'true'}
        title={error?.message ? error?.message : t('orderAdded')}
      ></ToastExample>
      {role === 'admin' && !load && !loading && !loadUptade && (
        <div
          style={{
            position: 'fixed',
            bottom: 15,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px 0',
            zIndex: 999,
            paddingLeft: 90,
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
