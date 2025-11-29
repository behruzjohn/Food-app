import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export const SIDEBAR_LINKS = [
  {
    title: 'Foods',
    path: '/foods',
    key: 'foods',
    icon: <FastfoodOutlinedIcon />,
  },
  {
    title: 'OrderList',
    path: '/order-list',
    key: 'orderList',
    icon: <FormatListBulletedIcon />,
  },

  {
    title: 'Categories',
    path: '/categories',
    key: 'categories',
    icon: <CategoryOutlinedIcon />,
  },

  {
    title: 'Customers',
    path: '/customer',
    key: 'customers',
    icon: <PeopleAltOutlinedIcon />,
    guard: { section: 'headerDashboard', action: 'customer' },
  },

  {
    title: 'FavouriteFoods',
    path: '/favourite',
    key: 'favouriteFoods',
    icon: <FavoriteBorderOutlinedIcon />,
    guard: { section: 'headerDashboard', action: 'faovuriteLink' },
  },
];
