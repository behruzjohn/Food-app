import {
  StyledLayoutWrapper,
  StyleHeaderDashboard,
} from './StyleHeaderDashboard';
import { Button } from '@mui/material';
import logo from '../../assets/img.png';
import { useEffect, useState } from 'react';
import { SIDEBAR_LINKS } from './constants';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GuardComponent from '../CheckRole/CheckRole';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function HeaderDashborad({ children }) {
  const { t } = useTranslation();
  const navigate = useNavigate('');
  const [role, setRole] = useState('');

  function handleClickLogOut() {
    localStorage.clear();
    navigate('/sign-in');
  }

  useEffect(() => {
    const stored = localStorage.getItem('authStore');
    const a = JSON.parse(stored || '{}');
    setRole(a?.state?.role);
  }, []);

  return (
    <StyledLayoutWrapper>
      <StyleHeaderDashboard>
        <img src={logo} alt="Logo" />
        <div className="header-nav">
          <ul>
            {SIDEBAR_LINKS?.map((item) => {
              const isActive = location.pathname === item.path;
              const content = (
                <li
                  className={isActive ? 'active' : ''}
                  key={item.key}
                  onClick={() => navigate(item.path)}
                >
                  <a>
                    {item.icon}
                    <span id="span-title">{t(item.key)}</span>
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
          variant="outlined"
        >
          <span id="span-title">{t('logOut')}</span>
        </Button>
      </StyleHeaderDashboard>
      <div className="content">{children}</div>
    </StyledLayoutWrapper>
  );
}
export default HeaderDashborad;
