import CategoriesPage from '../Pages/Categories';
import Customers from '../Pages/Customers';
import Foods from '../Pages/Foods';
import ForgotPasswordPage from '../Pages/ForgotPassword';
import OrdersPg from '../Pages/Orders';
import SignIn from '../Pages/Sign-in';
import SignUp from '../Pages/Sign-up';
import { ROUTE_PATHS } from './path';
import FavouriteFood from '../Pages/FavouritePage';
import ShopCart from '../Pages/ShopCard';
import OrderItem from '../Pages/Orders/pages/OrderItem';

export const routes = [
  {
    path: ROUTE_PATHS.mainPg,
    component: <OrdersPg />,
  },
  {
    path: ROUTE_PATHS.orders,
    component: <OrdersPg />,
  },
  {
    path: ROUTE_PATHS.signIn,
    component: <SignIn />,
  },
  {
    path: ROUTE_PATHS.signUp,
    component: <SignUp />,
  },
  {
    path: ROUTE_PATHS.forgotPass,
    component: <ForgotPasswordPage />,
  },
  {
    path: ROUTE_PATHS.customer,
    component: <Customers />,
  },
  {
    path: ROUTE_PATHS.foods,
    component: <Foods />,
  },
  {
    path: ROUTE_PATHS.categories,
    component: <CategoriesPage />,
  },
  {
    path: ROUTE_PATHS.favourite,
    component: <FavouriteFood />,
  },
  {
    path: ROUTE_PATHS.foodCart,
    component: <ShopCart />,
  },
  {
    path: `${ROUTE_PATHS.orderItems}/:id`,
    component: <OrderItem />,
  },
];
