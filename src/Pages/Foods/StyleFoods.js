import styled from 'styled-components';

export const StyleFoods = styled.div`
  .foods-header {
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
  }
  .food-cards-nav {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    width: 100%;
  }
  .img-with {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }
  #undefind {
    margin-top: 50px;
    width: 550px;
    height: 400px;
  }
  @media screen and (max-width: 480px) {
    .foods-header {
      display: flex;
      flex-direction: column;
      font-size: 14px;
    }
    .foods-header button {
      font-size: 12px;
      margin-top: 10px;
      width: 150px;
      height: 35px;
      padding: 2px;
    }
    #special {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }
`;
