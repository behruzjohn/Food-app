import styled from 'styled-components';

const StyleFoodQuantity = styled.div`
  .box-h2 {
    font-weight: 600;
    margin-bottom: 20px;
  }

  .btn-dev {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
  }

  #minusBtn {
    cursor: pointer;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #ff4d4f;
    border: none;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .btn-dev input {
    width: 70px;
    height: 45px;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  #plusBtn {
    cursor: pointer;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #1677ff;
    border: none;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  #addBtn {
    width: 100%;
    padding: 10px 0;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
  }
`;
export default StyleFoodQuantity;
