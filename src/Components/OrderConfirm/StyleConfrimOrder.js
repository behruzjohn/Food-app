import styled from 'styled-components';

export const StyleOrderConfirm = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  width: 440px;
  padding: 20px;
  height: 420px;
  margin-top: 20px;

  border: 1px solid gray;
  border-radius: 12px;

  img {
    object-fit: cover;
    border-radius: 12px;
    width: 100%;
    height: 150px;
  }
  #container-main {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }
  #container-main h4 {
    font-family: sans-serif;
  }
  #container-main span {
    color: green;
  }
  button {
    margin-top: 25px;
    max-width: 100%;
    width: 100%;
  }
  #cart-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  @media screen and (max-width: 480px) {
    min-height: 100%;
    width: 100%;
  }
`;
