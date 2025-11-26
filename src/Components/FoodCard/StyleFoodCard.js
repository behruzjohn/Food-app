import styled from 'styled-components';

export const StyleFoodCard = styled.div`
  margin-top: 20px;
  background-color: ${(props) =>
    props.isSpeacial
      ? '#fff'
      : props.isFavourite
      ? '#fff'
      : props.isFoodCard
      ? '#fbcce6'
      : '#fff'};
  width: 270px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 20%;
    object-fit: cover;
    margin-bottom: 12px;
  }

  h2 {
    margin: 8px 0;
    font-size: 20px;
  }

  p {
    color: #666;
    margin-bottom: 16px;
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
  #unicBtn {
    position: relative;
    left: 105px;
  }
  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .btn button {
    width: 40px !important;
    height: 36px !important;
    min-width: 30px !important;
    border-radius: 6px;
    padding: 0 !important;
  }

  .btn p {
    font-size: 12px;
    color: #333;
    margin-top: 5px;
  }
  .quontity {
    background-color: red;
    padding: 15px;
    position: relative;
    bottom: 15px;
    left: 110px;
  }
  .quontity span {
    color: #fff;
  }
`;
