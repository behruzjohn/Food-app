import { Button } from '@mui/material';
import { StyleMainLoginPage } from './StyleMainLogo';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

function MainLoginPage() {
  const [load, setLoad] = useState(false);
  const naviagte = useNavigate('');
  useEffect(() => {
    setLoad(true);
    const local = localStorage.getItem('token');
    if (local) {
      setTimeout(() => {
        setLoad(false);
        naviagte('/dashboard');
      }, 1500);
    } else {
      setLoad(false);
    }
  }, []);
  return (
    <>
      <Loader load={load}></Loader>
      <StyleMainLoginPage className="loginBg">
        <div className="btns">
          <nav>
            <h1>Welocome to my website</h1>
            <Button color="warning" variant="contained">
              <a href="/sign-in">Login</a>
            </Button>
            <Button color="info" variant="contained">
              <a href="/sign-up">Sign up</a>
            </Button>
          </nav>
        </div>
      </StyleMainLoginPage>
    </>
  );
}
export default MainLoginPage;
