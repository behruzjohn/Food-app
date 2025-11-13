import styled from 'styled-components';

export const StyleCategoryCardS = styled.div`
  margin-top: 20px;
  background-color: #fff;
  width: 273px;
  height: 100px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
  transition: all 0.3s ease;
  cursor: pointer;

  .card__content {
    display: flex;
    gap: 16px;
  }

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  h2 {
    font-size: 20px;
  }

  p {
    color: #666;
  }

  span {
    color: green;
    font-weight: bold;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: auto;
  }

  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .btn button {
    width: 30px !important;
    height: 36px !important;
    min-width: 30px !important;
    border-radius: 6px;
    padding: 0 !important;
  }

  .btn p {
    font-size: 12px;
    color: #333;
  }
`;
