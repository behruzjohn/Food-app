import { useEffect, useState } from 'react';
import HeaderDashborad from './HeaderDashboard';
import { StyleDashboard } from './StyleDashboard';
import DashboardMain from './DashboardMain';
import OrdersPg from './Orders';
import OrderDetail from './OrderDetail';
import Customer from './Customer';
import Reviews from './Reviews';
import Foods from './Foods';
import FoodDetail from './FoodDetail';
import { useNavigate } from 'react-router-dom';

function Dashbord() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const navigate = useNavigate('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/sign-in');
    }
  }, []);

  return (
    <StyleDashboard>
      <HeaderDashborad
        setActiveComponent={setActiveComponent}
      ></HeaderDashborad>
      {activeComponent === 'dashboard' && <DashboardMain />}
      {activeComponent === 'order-list' && <OrdersPg />}
      {activeComponent === 'order-detail' && <OrderDetail />}
      {activeComponent === 'customer' && <Customer />}
      {activeComponent === 'reviews' && <Reviews />}
      {activeComponent === 'foods' && <Foods />}
      {activeComponent === 'food-details' && <FoodDetail />}
    </StyleDashboard>
  );
}
export default Dashbord;
