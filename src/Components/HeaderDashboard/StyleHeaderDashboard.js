import styled from 'styled-components';

export const StyledLayoutWrapper = styled.div`
  position: relative;

  .content {
    min-height: 100vh;
    padding-block: 32px;
    padding-left: 280px;
    background-color: #f3f3f7;
  }
`;

export const StyleHeaderDashboard = styled.div`
  position: fixed;
  width: 280px;
  height: 100%;
  z-index: 1111;
  background-color: #fff;

  .header-nav {
    padding: 30px;
  }
  .header-nav ul {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .header-nav ul li {
    display: flex;
    align-items: center;
    list-style: none;
  }
  .header-nav ul li a {
    display: flex;
    gap: 15px;
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
`;
