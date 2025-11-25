import styled from 'styled-components';

export const StyledLayoutWrapper = styled.div`
  position: relative;

  .content {
    overflow: hidden;
    min-height: 100vh;
    padding-block: 32px;
    padding-left: 280px;
    background-color: #f3f3f7;
  }
  @media (max-width: 800px) {
    .content {
      min-height: 100vh;
      padding-block: 32px;
      padding-left: 90px;
      background-color: #f3f3f7;
    }
  }
`;

export const StyleHeaderDashboard = styled.div`
  position: fixed;
  width: 290px;
  padding: 20px;
  height: 100%;
  z-index: 1 !important;
  background-color: #fff;

  .active {
    background-color: lightgreen;
    color: green;
    border-radius: 8px;
    padding: 10px !important;
  }

  .header-nav {
    padding: 30px;
  }
  button {
    margin-top: 27px;
    margin-left: 30px;
    width: 70%;
  }
  img {
    cursor: pointer;
    margin-left: 38px;
    margin-top: 22px;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  .header-nav ul {
    margin-top: 0px;
    display: flex;
    flex-direction: column;

    gap: 50px;
  }
  .header-nav ul li {
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    list-style: none;
  }
  .header-nav ul li a {
    display: flex;
    gap: 15px;
    align-items: center;
    text-decoration: none;
    color: black;
  }
  .add-menus {
    background-color: #00b074;
    padding: 20px;
    display: flex;
    border-radius: 20px;
    gap: 5px;
    align-items: center;
  }
  #text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: #fff;
  }
  #text button {
    background-color: #fff;
    color: black;
    width: 150px;
    height: 50px;
  }
  .add-menus img {
    margin-bottom: 55px;
    width: 100px;
    height: 90px;
  }

  @media (max-width: 800px) {
    width: ${(props) => (props.$openHeaderDashboard ? '280px' : '80px')};
    padding: 0;
    #span-title {
      display: ${(props) => (props.$openHeaderDashboard ? 'flex' : 'none')};
    }
    img {
      width: ${(props) => (props.$openHeaderDashboard ? '150px' : '65px')};
      height: ${(props) => (props.$openHeaderDashboard ? '150px' : '65px')};
      margin-left: ${(props) => (props.$openHeaderDashboard ? '35px' : '8px')};
    }
    button {
      width: ${(props) => (props.$openHeaderDashboard ? '220px' : '20px')};
      height: 40px;
      margin-left: ${(props) => (props.$openHeaderDashboard ? '28px' : '5px')};
      padding-left: 30px;
    }
    .header-nav ul li a svg {
      font-size: 22px;
    }
    .header-nav ul li {
      padding: 10px;
      padding-left: 0px;
    }
  }
  @media (max-width: 800px) {
    .header-nav ul li.active {
      padding: 18px !important;
      background-color: #9ae6b4;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      margin-left: -8px;
    }

    .header-nav ul li.active a {
      padding: 0 !important;
      justify-content: center;
      display: flex;
    }
  }
`;
