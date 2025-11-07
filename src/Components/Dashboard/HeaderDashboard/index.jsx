import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { StyleHeaderDashboard } from './StyleHeaderDashboard';
import cooker from '../../../assets/illustration.png';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
function HeaderDashborad({ setActiveComponent }) {
  return (
    <StyleHeaderDashboard>
      <div className="header-nav">
        <h1>Behruz</h1>
        <p>Modern Restaurant Dashboard</p>
        <ul>
          <li onClick={() => setActiveComponent('dashboard')}>
            <a href="#">
              <HomeIcon />
              Dashborad
            </a>
          </li>
          <li onClick={() => setActiveComponent('order-list')}>
            <a href="#">
              <FormatListBulletedIcon />
              Order List
            </a>
          </li>
          <li onClick={() => setActiveComponent('order-detail')}>
            <a href="#">
              <CreditScoreIcon />
              Order Detail
            </a>
          </li>
          <li onClick={() => setActiveComponent('customer')}>
            <a href="#">
              <SupportAgentIcon />
              Customer
            </a>
          </li>
          <li onClick={() => setActiveComponent('reviews')}>
            <a href="#">
              <BorderColorIcon />
              Reviews
            </a>
          </li>
          <li onClick={() => setActiveComponent('foods')}>
            <a href="#">
              <FastfoodIcon />
              Foods
            </a>
          </li>
          <li onClick={() => setActiveComponent('food-details')}>
            <a href="#">
              <MenuBookIcon />
              Food details
            </a>
          </li>
          <div className="add-menus">
            <div id="text">
              <p>Please, organize your menus through button bellow!</p>
              <Button variant="contained">
                {/* <AddIcon /> */}+ Add menus
              </Button>
            </div>
            <img src={cooker} alt="Cooker" />
          </div>
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
  );
}
export default HeaderDashborad;
