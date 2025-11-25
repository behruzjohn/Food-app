import styled from 'styled-components';

export const StyleCategories = styled.div`
  header {
    display: flex;
    justify-content: space-between;
  }
  .category-nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
  }

  .defualtImage {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .defualtImage img {
    width: 400px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 480px) {
    header {
      display: flex;
      flex-direction: column;
      font-size: 14px;
    }
    .defualtImage img {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
    header button {
      margin-top: 12px;
      width: 210px;
      font-size: 10px;
    }
  }
`;
