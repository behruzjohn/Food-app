import {
  Avatar,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useLang } from '../../useLang';
import { StyleOrders } from './StyleOrders';
import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import GuardComponent from '../CheckRole/CheckRole';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import { GET_ALL_FAVOURITE_FOODS, GET_FOODS_BY_SEARCH } from './api';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

function OrderSearch({
  setLoadSearch,
  quontityLen,
  setFoods,
  allFoodsForSearch,
  action,
  refetchItem,
}) {
  const { t } = useTranslation();
  const naivagte = useNavigate('');
  const { lang, setLang } = useLang();
  const [role, setRole] = useState('');
  const [open, setopen] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const name = localStorage.getItem('userName') || '';
  const upperCaseName = name ? name[0]?.toUpperCase() : '';

  const [getSearchedFood, { data }] = useLazyQuery(GET_FOODS_BY_SEARCH);
  const [getFavouriteLength, { data: FavouriteFood }] = useLazyQuery(
    GET_ALL_FAVOURITE_FOODS
  );

  const handleChange = (event) => {
    const newLang = event.target.value;
    setLang(newLang);
  };

  const handleAvatarClick = (event) => {
    setopen(event.currentTarget);
  };
  const handleClose = () => {
    setopen(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    naivagte('/sign-in');
    handleClose();
  };

  const handleChangePassword = () => {
    naivagte('/forgotPass');
    handleClose();
  };

  const handleClickFavourite = () => {
    naivagte('/food-cart');
  };

  const changedInput = (e) => {
    setLoadSearch(true);
    setTimeout(() => {
      setSearchInput(e.target.value);
      setLoadSearch(false);
    }, 300);
  };

  useEffect(() => {
    getFavouriteLength();
  }, [FavouriteFood]);

  useEffect(() => {
    const stored = localStorage.getItem('authStore');
    const a = JSON.parse(stored || '{}');
    setRole(a?.state?.role);
  }, []);

  useEffect(() => {
    if (data?.getAllFoods?.payload) {
      setFoods(data.getAllFoods.payload);
    }
  }, [data, setFoods]);

  useEffect(() => {
    if (action === 'foods') {
      if (
        searchInput === '' ||
        searchInput === null ||
        searchInput === undefined
      ) {
        refetchItem();
        setFoods(allFoodsForSearch || []);
      } else {
        getSearchedFood({ variables: { name: searchInput } });
      }
    }
  }, [searchInput, action]);

  return (
    <StyleOrders>
      <div className="orders-search">
        <div id="order-special">
          {action !== 'category' && (
            <TextField
              className="input"
              onChange={(e) => changedInput(e)}
              type="text"
              placeholder={t('searchPlaceHolder')}
              style={{ backgroundColor: 'white' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </div>

        <div className="profile">
          <GuardComponent role={role} section="foodFavourite" action="icon">
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleClickFavourite()}
              className="shop"
            >
              <LocalGroceryStoreOutlinedIcon />
              {quontityLen > 0 && <span className="badge">{quontityLen}</span>}
            </div>
          </GuardComponent>
          <FormControl className="selectId">
            <InputLabel id="lang-select-label">{t('lang')}</InputLabel>
            <Select
              className="select"
              labelId="lang-select-label"
              id="lang-select"
              value={lang}
              label={t('lang')}
              onChange={handleChange}
              style={{ height: 40 }}
              MenuProps={{
                disableScrollLock: true,
                disableAutoFocusItem: true,
              }}
            >
              <MenuItem value="en">En</MenuItem>
              <MenuItem value="uz">Uz</MenuItem>
              <MenuItem value="ru">Ru</MenuItem>
            </Select>
          </FormControl>

          <p>
            {t('greeting')} <strong>{name}</strong>
          </p>
          <Avatar onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
            {upperCaseName}
          </Avatar>
          <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon>
                <PasswordIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography>{t('changePass')}</Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText>
                <Typography color="error">{t('logOut')}</Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </StyleOrders>
  );
}
export default OrderSearch;
