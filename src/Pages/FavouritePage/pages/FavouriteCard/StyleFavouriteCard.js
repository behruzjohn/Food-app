import styled from 'styled-components';

export const StyleFavouriteCard = styled.div`
  margin-top: 20px;
  width: 100%;

  .card-box img {
    object-fit: cover;
    border-radius: 8px;
    width: 100px;
    height: 100px;
  }
  .card-box {
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid black;
    display: flex;
    gap: 20px;
  }
  .texts {
    width: 100%;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
  }
  .btn-container button {
    width: 195px;
    height: 33px;
  }
  .btn-container button span {
    font-size: 11px;
    display: flex;
    gap: 10px;
  }
`;
