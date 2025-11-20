import React, { useEffect, useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
} from '@mui/material';
import {
  MoreHoriz,
  CheckCircleOutline,
  CancelOutlined,
} from '@mui/icons-material';
import OrderSearch from '../../Components/OrderSearch/index';
import AddOrder from '../../Components/AddOrder/index';
import { gql } from '@apollo/client';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import CheckToken from '../../Components/CheckToken';
import ToastExample from '../../Components/Toast';
import { useTranslation } from 'react-i18next';
import noOrder from '../../assets/noRemove.png';
import { StyleCustomer } from '../Customer/StyleCustomer';

const GET_USERS = gql`
  query GetUsers($filter: UserFilterInput) {
    getUsers(filter: $filter) {
      payload {
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
`;
function Customers() {
  const [user, setUser] = useState([]);
  const { t } = useTranslation();

  const [getUsers, { data, loading, error }] = useLazyQuery(GET_USERS);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (data?.getUsers?.payload) {
      setUser(data.getUsers.payload);
    }
  }, [data]);

  CheckToken();

  return (
    <HeaderDashborad>
      <StyleCustomer className="orders">
        <div className="orders-nav">
          <OrderSearch action={'category'} />

          <div className="main-header">
            <div className="order-header-text">
              <h2>{t('customers')}</h2>
              <p>{t('customerDescription')}</p>
            </div>
          </div>

          <div className="orders-list">
            <div className="orders-list-nav">
              <table>
                <thead>
                  <tr>
                    <th>{t('customerId')}</th>
                    <th>{t('joinDate')}</th>
                    <th>{t('customerName')}</th>
                    <th>{t('telegramId')}</th>
                    <th>{t('phoneNumber')}</th>
                    <th>{t('role')}</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map(
                    (u) =>
                      u?.role && (
                        <tr key={u._id}>
                          <td>#{u._id.slice(0, 8)}</td>
                          <td>
                            {u?.createdAt
                              ? new Date(u.createdAt).toLocaleDateString()
                              : '-'}
                          </td>
                          <td>{u.name || 'No name'}</td>
                          <td>{u.telegramId || '-'}</td>
                          <td style={{ fontFamily: 'sans-serif' }}>
                            <a
                              href={`tel:${u.phone}`}
                              style={{
                                color: 'blue',
                                textDecoration: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              {u.phone}
                            </a>
                          </td>
                          <td>
                            <Chip
                              label={u.role}
                              color={
                                u.role === 'admin'
                                  ? 'error'
                                  : u.role === 'moderator'
                                  ? 'warning'
                                  : 'default'
                              }
                            />
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </StyleCustomer>
    </HeaderDashborad>
  );
}

export default Customers;
