import styled from 'styled-components';

export const StyleCategoryInfo = styled.div`
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
      margin-top: 30px;
    }
  }
`;
