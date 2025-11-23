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
import { StyleOrders } from './StyleOrders';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import { useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ToastExample from '../Toast';
import GuardComponent from '../CheckRole/CheckRole';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { useLang } from '../../useLang';
import Loader from '../Loader';

const GET_FOODS_BY_SEARCH = gql`
  query GetAllFoods($name: String!) {
    getAllFoods(name: $name) {
      payload {
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
  }
`;

const GET_ALL_FAVOURITE_FOODS = gql`
  query GetFavoriteFoods {
    getFavoriteFoods {
      payload {
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
  }
`;

function OrderSearch({
  quontityLen,
  setFoods,
  allFoodsForSearch,
  action,
  refetchItem,
}) {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { lang, setLang } = useLang();

  const handleChange = (event) => {
    const newLang = event.target.value;
    setLang(newLang);
  };

  const [getSearchedFood, { data, loading, error }] =
    useLazyQuery(GET_FOODS_BY_SEARCH);

  const [getFavouriteLength, { data: FavouriteFood }] = useLazyQuery(
    GET_ALL_FAVOURITE_FOODS
  );
  const [role, setRole] = useState('');

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('authStore') || '');
    console.log(a?.state?.role);

    setRole(a?.state?.role);
  }, []);

  useEffect(() => {
    getFavouriteLength();
  }, [FavouriteFood]);

  useEffect(() => {
    if (action === 'foods') {
      console.log(searchInput === '');

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

  useEffect(() => {
    if (data?.getAllFoods?.payload) {
      setFoods(data.getAllFoods.payload);
    }
  }, [data, setFoods]);

  const changedInput = (e) => {
    setLoad(true);
    setTimeout(() => {
      setSearchInput(e.target.value);
      setLoad(false);
    }, 300);
  };
  const [open, setopen] = useState(null);
  const naivagte = useNavigate('');
  const name = localStorage.getItem('userName') || '';
  const upperCaseName = name ? name[0]?.toUpperCase() : '';

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
    // if (quontityLen > 0) {
    naivagte('/food-cart');
    // }
  };

  return (
    <StyleOrders>
      <Loader load={load}></Loader>
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
            <InputLabel id="lang-select-label">Lang</InputLabel>
            <Select
              className="select"
              style={{ height: 40 }}
              labelId="lang-select-label"
              id="lang-select"
              value={lang}
              label="Lang"
              onChange={handleChange}
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
