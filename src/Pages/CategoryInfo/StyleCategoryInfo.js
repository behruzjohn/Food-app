import styled from 'styled-components';

export const StyleCategoryInfo = styled.div`
  .continer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  #undefind {
    margin-top: 50px;
    margin-left: 350px;
    width: 450px;
    height: 400px;
    object-fit: contain;
  }

  @media (max-width: 800px) {
    #undefind {
      margin-left: 0;
      width: 100%;
      max-width: 350px;
      height: auto;
      display: block;
      margin-inline: auto;
      margin-top: 160px;
    }
    .continer button {
      height: 35px;
      font-size: 12px;
    }
  }
`;
