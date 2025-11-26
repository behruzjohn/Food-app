import { useEffect, useState } from 'react';
import { Chip, Container } from '@mui/material';
import OrderSearch from '../../Components/OrderSearch/index';
import { useLazyQuery } from '@apollo/client/react';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import CheckToken from '../../Components/CheckToken';
import { useTranslation } from 'react-i18next';
import { GET_USERS } from './api';
import { StyleCustomers } from './StyleCustomers';

function Customers() {
  const { t } = useTranslation();
  const [user, setUser] = useState([]);

  const [getUsers, { data }] = useLazyQuery(GET_USERS);

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
      <StyleCustomers className="orders">
        <Container maxWidth="xl">
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
        </Container>
      </StyleCustomers>
    </HeaderDashborad>
  );
}

export default Customers;
