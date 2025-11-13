import styled from 'styled-components';
import mainLogoBg from '../../assets/mainLogoimg.png';

export const StyleMainLoginPage = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${mainLogoBg});
  position: absolute;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  .btns {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  nav {
    background-color: rgba(0, 0, 0, 0.5); 
    padding: 30px;
    border-radius: 20px;
    display: flex;
    color: aliceblue;
    position: relative;
    bottom: 120px;
    align-items: center;
    gap: 20px;
    flex-direction: column;
  }
  nav a {
    color: #fff;
    text-decoration: none;
  }
  nav button {
    width: 200px;
    height: 50px;
  }
`;
