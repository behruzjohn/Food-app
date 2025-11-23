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
import Customer from './Pages/Customer/index.jsx';
import { Reviews } from '@mui/icons-material';
import Foods from './Pages/Foods/index.jsx';
import CategoriesPage from './Pages/Categories';
import CategoryInfo from './Pages/Categories/pages/Info/index.jsx';
import { clientAppollo } from '../src/client.js';
import FavouriteFood from './Pages/FavouritePage/index.jsx';
import FoodCard from './Pages/ShopCard/index.jsx';
import ShopCart from './Pages/ShopCard/index.jsx';
import './i18n.js';
import Customers from './Pages/Customers/index.jsx';
import { routes } from './routing/routes.jsx';
import OrderItem from './Pages/Orders/pages/OrderItem/index.jsx';

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={clientAppollo}>
    <BrowserRouter>
      <Routes>
        {routes?.map((route) => {
          return <Route path={route?.path} element={route?.component} />;
        })}
        <Route path="/categoriesById/:id" element={<CategoryInfo />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
