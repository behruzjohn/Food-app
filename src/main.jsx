import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/Sign-in/index.jsx';
import SignUp from './Pages/Sign-up/index.jsx';
import MainLoginPage from './Pages/MainLoginPage/index.jsx';
import { ApolloProvider } from '@apollo/client/react';
import ForgotPasswordPage from './Pages/ForgotPassword/index.jsx';
import AddFood from './Components/AddFood/index.jsx';
import OrdersPg from './Pages/Orders/index.jsx';
import OrderDetail from './Pages/OrderDetail/index.jsx';
import Customer from './Pages/Customer/index.jsx';
import { Reviews } from '@mui/icons-material';
import Foods from './Pages/Foods/index.jsx';
import ReviewsPg from './Pages/CategoriesPage/index.jsx';
import CategoriesPage from './Pages/CategoriesPage/index.jsx';
import CategoryInfo from './Pages/CategoryInfo/index.jsx';
import { clientAppollo } from '../src/client.js';
import FavouriteFood from './Pages/FavouritePage/index.jsx';
import FoodCard from './Pages/ShopCard/index.jsx';
import ShopCart from './Pages/ShopCard/index.jsx';
import './i18n.js';
import Customers from './Pages/Customers/index.jsx';

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={clientAppollo}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrdersPg />} />
        <Route path="/order-list" element={<OrdersPg />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/forgotPass" element={<ForgotPasswordPage />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categoriesById" element={<CategoryInfo />} />
        <Route path="/favourite" element={<FavouriteFood />} />
        <Route path="/food-cart" element={<ShopCart />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
