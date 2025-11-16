import {
  StyledLayoutWrapper,
  StyleHeaderDashboard,
} from './StyleHeaderDashboard';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_LINKS } from './constants';
import { useEffect, useState } from 'react';
import GuardComponent from '../CheckRole/CheckRole';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/img.png';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function HeaderDashborad({ children }) {
  const [openHeaderDashboard, setOpenHeaderDashboard] = useState(false);
  const navigate = useNavigate('');
  const { t } = useTranslation();

  const [role, setRole] = useState('');

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('authStore') || '');
    console.log(a?.state?.role);

    setRole(a?.state?.role);
  }, []);

  function handleClickLogOut() {
    localStorage.clear();
    navigate('/sign-in');
  }

  function handleClickLogo() {
    if (window.innerWidth <= 800) {
      setOpenHeaderDashboard((prev) => !prev);
    }
  }

  return (
    <StyledLayoutWrapper>
      <StyleHeaderDashboard openHeaderDashboard={openHeaderDashboard}>
        <img onClick={handleClickLogo} src={logo} alt="Logo" />
        <div className="header-nav">
          <ul>
            {SIDEBAR_LINKS?.map((item) => {
              const content = (
                <li key={item.key} onClick={() => navigate(item.path)}>
                  <a>
                    {item.icon}
                    <span id="span-title">{t(item.title)}</span>
                  </a>
                </li>
              );
              if (item.guard) {
                return (
                  <GuardComponent
                    key={item.key}
                    role={role}
                    section={item.guard.section}
                    action={item.guard.action}
                  >
                    {content}
                  </GuardComponent>
                );
              }
              return content;
            })}
          </ul>
        </div>
        <Button
          onClick={() => handleClickLogOut()}
          startIcon={<LogoutOutlinedIcon />}
          color="error"
          variant="contained"
        >
          <span id="span-title">{t('logOut')}</span>
        </Button>
      </StyleHeaderDashboard>
      <div className="content">{children}</div>
    </StyledLayoutWrapper>
  );
}
export default HeaderDashborad;
