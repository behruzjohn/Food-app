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
  .addSpan {
    display: flex;
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
      flex-direction: row;
    }
  }
  @media screen and (max-width: 480px) {
    .addSpan {
      display: none;
    }
    #special button {
      margin-top: 0;
      width: 10px !important;
      min-width: 47px;
      height: 35px;
      display: flex;
    }
    .food-cards {
      flex-direction: column;
    }
    .foods-header {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 14px;
      justify-content: space-between;
      max-width: 100%;
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
