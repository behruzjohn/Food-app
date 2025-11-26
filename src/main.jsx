import './i18n.js';
import './index.css';
import { createRoot } from 'react-dom/client';
import { routes } from './routing/routes.jsx';
import { clientAppollo } from '../src/client.js';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderItem from './Pages/Orders/pages/OrderItem/index.jsx';
import CategoryInfo from './Pages/Categories/pages/Info/index.jsx';

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={clientAppollo}>
    <BrowserRouter>
      <Routes>
        {routes?.map((route) => {
          return <Route path={route?.path} element={route?.component} />;
        })}
        <Route path="/categoriesById/:id" element={<CategoryInfo />} />
        <Route path="/orderItems/:id" element={<OrderItem />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
