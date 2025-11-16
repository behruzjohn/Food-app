import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const aa = localStorage.getItem('authStore');
    let localToken = null;

    try {
      localToken = aa ? JSON.parse(aa) : null;
    } catch (e) {
      localToken = null;
    }

    const token = localToken?.state?.token;

    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate]);
}
export default CheckToken;
