import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';
import Person2Icon from '@mui/icons-material/Person2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTransition } from 'react';

export const SIDEBAR_LINKS = [
  {
    title: 'orderList',
    path: '/order-list',
    key: 'order-list',
    icon: <FormatListBulletedIcon />,
  },

  {
    title: 'customer',
    path: '/customer',
    key: 'customer',
    icon: <Person2Icon />,
    guard: { section: 'headerDashboard', action: 'customer' },
  },
  {
    title: 'foods',
    path: '/foods',
    key: 'foods',
    icon: <FastfoodIcon />,
  },
  {
    title: 'categories',
    path: '/categories',
    key: 'categories',
    icon: <CategoryIcon />,
  },

  {
    title: 'favouriteFoods',
    path: '/favourite',
    key: 'favourite',
    icon: <FavoriteIcon />,
    guard: { section: 'headerDashboard', action: 'faovuriteLink' },
  },
];
