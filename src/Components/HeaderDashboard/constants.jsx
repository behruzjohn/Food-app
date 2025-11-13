import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';

export const SIDEBAR_LINKS = [
  {
    title: 'Order List',
    path: '/order-list',
    key: 'order-list',
    icon: <FormatListBulletedIcon />,
  },
  {
    title: 'Order Detail',
    path: '/order-detail',
    key: 'order-detail',
    icon: <CreditScoreIcon />,
  },

  {
    title: 'Customer',
    path: '/customer',
    key: 'customer',
    icon: <SupportAgentIcon />,
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
];
