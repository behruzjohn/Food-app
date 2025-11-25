import styled from 'styled-components';

export const StyleOrderItem = styled.div`
  .header_nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media screen and (max-width: 480px) {
    .header_nav {
      margin-top: 15px;
      flex-direction: column;
    }
    .header_nav h2 {
      font-size: 20px;
    }
    .header_nav p {
      font-size: 15px;
    }
  }
`;
