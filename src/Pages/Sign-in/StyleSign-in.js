import styled from 'styled-components';
import signInBg from '../../assets/sign-in.jpg';

export const StyleSignIn = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'curive';
  width: 100%;
  height: 100vh;
  background-image: url(${signInBg});
  position: absolute;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  .sign-in-nav {
    width: 400px;
  }

  .texts span {
    color: red;
  }
  .texts {
    display: flex;
    gap: 10px;
  }
  .lang {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .texts {
    flex-direction: column;
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .form {
    width: 100%;
    border-radius: 12px;
    padding: 20px;
    height: auto;
    background-color: #fff;
  }

  .inputs {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-nav {
    padding: 20px;
  }
  form {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  form button {
    margin-top: 10px;
    height: 48px;
  }
  @media (max-width: 800px) {
    background-image: url(${signInBg});
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .sign-in-nav {
      width: 100%;
      max-width: 50%;
    }
    .lang {
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
  @media (max-width: 750px) {
    .sign-in-nav {
      max-width: 70%;
    }
  }
  @media (max-width: 520px) {
    .sign-in-nav {
      max-width: 100%;
    }
  }
`;
