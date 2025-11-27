import styled from 'styled-components';

export const StyleOrderConfirm = styled.div`
  font-family: sans-serif;
  width: 100%;
  max-width: 340px;
  max-height: 500px;
  padding: 20px;
  height: auto;
  margin: 20px auto;
  border: 1px solid gray;
  border-radius: 12px;
  box-sizing: border-box;

  img {
    object-fit: cover;
    border-radius: 12px;
    width: 100%;
    height: 150px;

    @media screen and (max-width: 480px) {
      height: 120px;
    }
  }

  #container-main {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  #container-main h4 {
    font-family: sans-serif;
    margin: 0;
    font-size: 1rem;

    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  #container-main span {
    color: green;
    font-size: 1rem;

    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  button {
    margin-top: 35px;
    width: 100%;
    height: 35px;
    max-width: 100%;
    padding: 10px;
    font-size: 1rem;

    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
      padding: 10px;
    }
  }

  #cart-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
  }

  @media screen and (max-width: 480px) {
    padding: 20px;
    border-radius: 10px;
  }
`;
