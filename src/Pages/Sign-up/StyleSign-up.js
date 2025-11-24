import styled from 'styled-components';
import signInBg from '../../assets/sign-in.jpg';

export const StyleSignUp = styled.div`
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
  .sign-up-nav {
    width: 400px;
    max-width: 400px;
    margin-top: 25px;
  }

  .texts span {
    color: red;
  }
  .texts {
    display: flex;
    gap: 10px;
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
    gap: 20px;
    width: 320px;
  }

  .form-nav {
    padding: 20px;
  }
  form {
    justify-content: center;
    align-items: center;
    display: flex;
  }
  @media (max-width: 800px) {
    background-image: url(${signInBg});
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .sign-up-nav {
      width: 100%;
      max-width: 100%;
      margin-top: 120px;
    }
  }
`;
