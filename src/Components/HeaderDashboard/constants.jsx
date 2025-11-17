import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';
import Person2Icon from '@mui/icons-material/Person2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useTransition } from 'react';
const role = localStorage.getItem('authStore');
const roleRes = role?.state?.role;
export const SIDEBAR_LINKS = [
  {
    title: 'OrderList',
    path: '/order-list',
    key: 'orderList',
    icon: <FormatListBulletedIcon />,
  },

  {
    title: 'Foods',
    path: '/foods',
    key: 'foods',
    icon: <FastfoodIcon />,
  },
  {
    title: 'Categories',
    path: '/categories',
    key: 'categories',
    icon: <CategoryIcon />,
  },

  {
    title: 'Customers',
    path: '/customer',
    key: 'customers',
    icon: <PeopleAltIcon />,
    guard: { section: 'headerDashboard', action: 'customer' },
  },

  {
    title: 'FavouriteFoods',
    path: '/favourite',
    key: 'favouriteFoods',
    icon: <FavoriteIcon />,
    guard: { section: 'headerDashboard', action: 'faovuriteLink' },
  },
];
