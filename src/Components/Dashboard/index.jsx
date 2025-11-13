import { useEffect, useState } from 'react';
import HeaderDashborad from '../../Components/HeaderDashboard/index';
import { StyleDashboard } from './StyleDashboard';
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
    </StyleDashboard>
  );
}
export default Dashbord;
