import styled from 'styled-components';

export const StyleFoods = styled.div`
  .foods-header {
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
  }
  .food-cards-nav {
    display: flex;
    margin-left: 0;
    gap: 18px;
    flex-wrap: wrap;
    width: 100%;
  }
  .food-cards {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .noCart {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
  }
  .confirmOrder {
    position: sticky;
    bottom: 0;
    z-index: 10;
  }
  #shopCart-nav {
    max-width: 800px;
  }
  .defualtImage {
    display: flex;
    justify-content: center;
    align-items: center;
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
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
  @media screen and (max-width: 1080px) {
    .food-cards {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 480px) {
    .food-cards {
      flex-direction: column;
    }
    .foods-header {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      gap: 0px;
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
