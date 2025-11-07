import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Components/Sign-in/index.jsx';
import SignUp from './Components/Sign-up/index.jsx';
import MainLoginPage from './Components/MainLoginPage/index.jsx';
import Dashbord from './Components/Dashboard/index.jsx';
import { clent } from './client.js';
import { ApolloProvider } from '@apollo/client/react';
import ForgotPasswordPage from './Components/Dashboard/ForgotPassword/index.jsx';

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={clent}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLoginPage />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
        <Route path="sign-up" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashbord />}></Route>
        <Route path="/forgotPass" element={<ForgotPasswordPage />}></Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
