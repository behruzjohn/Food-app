import { Button } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useEffect, useState } from 'react';
import { StyleVerificationCode } from './StyleVerificationCode';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { CONFIRM_SIGN_UP } from '../../api';
import { useTranslation } from 'react-i18next';

function VerificationCode() {
  const [code, setCode] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const { t } = useTranslation();
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const [fetchConfirm] = useMutation(CONFIRM_SIGN_UP);
  const location = useLocation();
  const { phone, token } = location.state || {};

  async function handleClickConfirm() {
    try {
      setConfirmError('');

      const res = await fetchConfirm({
        variables: { code, token },
      });

      if (res?.data?.confirmSignUp?.token) {
        localStorage.setItem('token', res.data.confirmSignUp.token);
        navigate('/sign-in');
      }
    } catch (err) {
      setConfirmError(err.message);
    }
  }

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timer === 0) {
      navigate('/sign-up');
      return;
    }

    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer, navigate]);

  return (
    <StyleVerificationCode isHaveError={confirmError}>
      <div className="container">
        <div className="container-nav">
          <h3>Tasdiqlash kodi</h3>
          <p
            style={{
              color: 'red',
              fontFamily: 'sans-serif',
            }}
          >
            Hozzircha sms bormaydi shunchaki <strong>12345</strong> ni tering!
          </p>

          <MuiOtpInput
            length={5}
            value={code}
            onChange={setCode}
            sx={{
              marginTop: '30px',
              '& input': {
                color: confirmError ? 'red' : 'inherit',
                borderColor: confirmError ? 'red' : 'gray',
              },
            }}
          />
        </div>
        <p id="timer">{formatTime(timer)}</p>
        {confirmError && (
          <p
            style={{
              color: 'red',
              marginTop: '10px',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            {confirmError}
          </p>
        )}
        <div className="resultContainer">
          <Button
            disabled={code.length < 5}
            onClick={handleClickConfirm}
            variant="contained"
          >
            {confirmError ? t('tryAgain') : t('verify')}
          </Button>
          <p style={{ color: 'blue' }}>
            {t('dontWant')}{' '}
            <a
              style={{ color: 'black', textDecoration: 'none' }}
              href="/sign-up"
            >
              {t('signIn')}
            </a>
          </p>
        </div>
      </div>
    </StyleVerificationCode>
  );
}

export default VerificationCode;
