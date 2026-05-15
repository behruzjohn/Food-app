import styled from "styled-components";

export const StyleOrderConfirm = styled.div`
  font-family: "Poppins", sans-serif;
  border: 1.5px solid #e4e9f2;
  width: 100%;
  padding: 18px;
  font-size: 14px;
  height: auto;
  margin: 20px auto;
  border-radius: 16px;
  margin-top: 0px;
  background: #fff;
  box-shadow: 0 10px 32px rgba(17, 24, 39, 0.08);
  box-sizing: border-box;

  img {
    object-fit: cover;
    border-radius: 12px;
    width: 100%;
    height: 142px;

    @media screen and (max-width: 480px) {
      height: 120px;
    }
  }

  #container-main {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
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
    color: #0f9d58;
    font-size: 1rem;

    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  button {
    margin-top: 18px;
    width: 100%;
    height: 42px;
    max-width: 100%;
    padding: 10px;
    font-size: 13px;
    border-radius: 10px;
    text-transform: none;
    font-weight: 600;

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
    border-top: 1px dashed #e5e7eb;
    padding-top: 12px;
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
    min-width: 100%;
  }

  @media screen and (max-width: 480px) {
    min-width: 100%;
    padding: 20px;
    border-radius: 10px;
    button {
      font-size: 12px;
    }
  }
`;
