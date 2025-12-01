import styled from 'styled-components';

export const StyleFoodCard = styled.div`
  margin-top: 20px;
  background-color: ${(props) =>
    props.isSpeacial || props.isFavourite
      ? '#fff'
      : props.isFoodCard
      ? '#fff0f6'
      : '#fff'};
  width: 270px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(16, 24, 40, 0.12);
  }

  .imageWrapper {
    width: 220px;
    height: 220px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f9;
    margin-bottom: 12px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  #unicBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 6;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 10px rgba(16, 24, 40, 0.08);
    transition: transform 0.15s ease, background 0.15s ease;
  }
  .quontityAdd {
    border-radius: 8px;
    background-color: #f0f2f5;
    padding: 4px;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .plus {
    border-radius: 8px;
    font-size: 27px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .minus {
    border-radius: 8px;
    font-size: 30px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }

  #unicBtn button {
    border: none;
    background: transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  #unicBtn:hover {
    transform: scale(1.06);
  }

  .quontity {
    position: absolute;
    top: 12px;
    left: 12px;
    background-color: #ef4444;
    color: #fff;
    font-weight: 700;
    min-width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    z-index: 6;
    box-shadow: 0 4px 10px rgba(16, 24, 40, 0.08);
    font-size: 13px;
  }

  h2 {
    margin: 6px 0 4px;
    font-size: 18px;
    text-align: center;
    color: #111827;
  }
  .optionsMenuIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 4px;
  }

  p.desc {
    color: #6b7280;
    margin: 0 16px 10px;
    font-size: 13px;
    text-align: left;
    width: 100%;
    line-height: 1.25;
  }

  p.priceRow {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #111827;
    margin-bottom: 10px;
    width: 100%;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .buttons {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    width: 100%;
    padding: 0 12px 12px;
    justify-content: center;
  }
  #edit {
    width: 100%;
    height: 40px;
  }
  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
  }

  .btn > p {
    font-size: 12px;
    color: #374151;
    margin: 0;
  }

  .btn .addToCartBtn {
    width: 100%;
    min-width: 120px;
    height: 38px;
    border-radius: 8px !important;
    padding: 4px 8px !important;
  }
  .btn button span {
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;
