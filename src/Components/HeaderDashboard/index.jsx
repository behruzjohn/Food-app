import {
  StyledLayoutWrapper,
  StyleHeaderDashboard,
} from './StyleHeaderDashboard';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SIDEBAR_LINKS } from './constants';

function HeaderDashborad({ children }) {
  const navigate = useNavigate('');
  return (
    <StyledLayoutWrapper>
      <StyleHeaderDashboard>
        <div className="header-nav">
          <h1>Behruz</h1>
          <p>Modern Restaurant Dashboard</p>
          <ul>
            {SIDEBAR_LINKS?.map((siderBarLink) => {
              return (
                <li
                  key={siderBarLink.key}
                  onClick={() => navigate(siderBarLink?.path)}
                >
                  <a href="">
                    {siderBarLink.icon}
                    {siderBarLink?.title}
                  </a>
                </li>
              );
            })}

            {/* <div className="info">
            <p>
              <strong>Behruz Restaurant Admin Dashboard</strong>
              <br />
              2025 All Rights Reserved
            </p>
            <p>Made with♥️by Behruz</p>
          </div> */}
          </ul>
        </div>
      </StyleHeaderDashboard>
      <div className="content">{children}</div>
    </StyledLayoutWrapper>
  );
}
export default HeaderDashborad;
