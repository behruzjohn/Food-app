import styled from 'styled-components';

export const StyleCategoryInfo = styled.div`
  .continer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .img-with {
    justify-content: center;
    margin-left: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img-with button {
    margin-right: 70px;
  }
  #undefind {
    margin-top: 50px;
    width: 450px;
    height: 400px;
    object-fit: contain;
  }

  @media (max-width: 800px) {
    .img-with {
      margin-left: 0;
      margin-top: 50px;
    }
    .img-with button {
      font-size: 10px;
      margin-right: 50px;
    }
    #undefind {
      margin-left: 0;
      width: 100%;
      max-width: 350px;
      height: auto;
      display: block;
      margin-inline: auto;
    }
    .continer button {
      height: 35px;
      font-size: 12px;
    }
  }
`;
