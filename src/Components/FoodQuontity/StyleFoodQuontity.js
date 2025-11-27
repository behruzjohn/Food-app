import styled from 'styled-components';

const StyleFoodQuantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  .box {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  #box-h2 {
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  .btn-dev {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  #minusBtn,
  #plusBtn {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  #minusBtn {
    background-color: #ff4d4f;
  }

  #plusBtn {
    background-color: #1677ff;
  }

  .btn-dev input {
    width: 60px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  #addBtn {
    width: 100%;
    height: 35px;
    padding: 10px 0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .box {
      padding: 15px;
      width: 85%;
    }
    #box-h2 {
      font-size: 1rem;
    }
    .btn-dev input {
      width: 50px;
      height: 35px;
      font-size: 16px;
    }
    #minusBtn,
    #plusBtn {
      width: 30px;
      height: 30px;
      font-size: 18px;
    }
  }
`;

export default StyleFoodQuantity;
