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
  .defualtImage {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .defualtImage img {
    margin-top: 100px;
    width: 400px;
    max-width: 100%;
    height: auto;
  }
  #def {
    width: 550px;
    height: 330px;
  }
  .food-cards {
    display: flex;
  }
  @media screen and (max-width: 480px) {
    .food-cards {
      flex-direction: column;
    }
    .foods-header {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      gap: 20px;
    }
    .foods-header p {
      margin-top: 10px;
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
    .defualtImage img {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
    #def {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`;
