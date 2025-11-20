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
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import CheckToken from '../../Components/CheckToken';

function Customer() {
  const { t } = useTranslation();
  const options = [t('allStatus'), t('finishedStatus')];
  const [openOption, setopenOption] = useState(null);
  const open = Boolean(openOption);
  CheckToken();

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
              <h2>{t('customers')}</h2>
              <p>{t('customerDescription')}</p>
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
            <div className="orders-list-scroll">
              <table>
                <thead>
                  <tr>
                    <th className="aa">{t('customerId')}</th>
                    <th>{t('joinDate')}</th>
                    <th>{t('customers')}</th>
                    <th>{t('location')}</th>
                    <th>{t('totalSpent')}</th>
                    <th>{t('lastOrder')}</th>
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
                          <ListItemText primary={t('editOrder')} />
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <DeleteIcon color="error" />
                          </ListItemIcon>
                          <ListItemText primary={t('deleteOrder')} />
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
