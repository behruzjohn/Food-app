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
  @media screen and (max-width: 480px) {
    header {
      display: flex;
      flex-direction: column;
      font-size: 14px;
    }
    header button {
      margin-top: 12px;
      width: 180px;
      font-size: 12px;
    }
  }
`;
