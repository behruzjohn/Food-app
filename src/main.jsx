import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './Pages/Sign-in/index.jsx';
import SignUp from './Pages/Sign-up/index.jsx';
import MainLoginPage from './Pages/MainLoginPage/index.jsx';
import Dashbord from './Components/Dashboard/index.jsx';
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
function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      navigate('/sign-in');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLoginPage />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="/forgotPass" element={<ForgotPasswordPage />} />
      <Route path="/order-list" element={<OrdersPg />} />
      <Route path="/order-detail" element={<OrderDetail />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/reviews" element={<ReviewsPg />} />
      <Route path="/foods" element={<Foods />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categoriesById" element={<CategoryInfo />} />
      <Route path="/dashboard" element={<Dashbord />} />
    </Routes>
  );
}
createRoot(document.getElementById('root')).render(
  <ApolloProvider client={clientAppollo}>
    <BrowserRouter>
      <Main></Main>
    </BrowserRouter>
  </ApolloProvider>
);
