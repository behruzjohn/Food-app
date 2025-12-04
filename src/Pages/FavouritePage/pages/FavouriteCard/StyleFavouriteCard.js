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
  .quontityAdd {
    border-radius: 8px;
    background-color: #f0f2f5;
    padding: 4px;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  #delete-menu {
    background-color: #fff;
    color: gray;
  }
  #removeText {
    display: flex;
  }
  #delete-menu:hover {
    color: black;
    cursor: pointer;
    transition: color 0.2s;
    .removeIcon {
      color: black;
    }
  }
  .removeIcon {
    color: gray;
    cursor: pointer;
    transition: color 0.2s;
  }

  .plus {
    cursor: pointer;
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
    cursor: pointer;
    border-radius: 8px;
    font-size: 30px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    max-width: 100%;
  }
  .box-container #save {
    height: 35px;
    font-size: 11px;
    display: flex;
    align-items: center;
  }
  .quantity-display {
    display: inline-block;
    min-width: 35px;
    text-align: center;
    padding: 6px 12px;
    border-radius: 12px;
    background-color: #d0e7ff;
    color: #004080;
    font-weight: bold;
    font-size: 14px;
    height: 35px;

    font-family: 'Segoe UI', sans-serif;
  }
  .priceContainer {
    display: flex;
    justify-content: flex-end;
  }
  .box-container {
    width: 200px;
    max-width: 100%;
  }
  .card-box {
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    background-color: #fff;
    gap: 20px;
  }
  .card-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  #span-btn {
    display: flex;
    gap: 7px;
  }
  @media screen and (max-width: 480px) {
    #removeText {
      display: none;
    }
    .card-nav {
      width: 100%;
      justify-content: space-between;
    }
    .card-box {
      display: flex;
      align-items: center;
    }
    .texts p {
      font-size: 12px;
    }
    .texts {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }
    .quontityAdd {
      margin-top: 10px;
      width: 100px;
    }
    .btn button {
      margin-top: 10px;
      width: 159px;
      height: 30px !important;
    }
    #span-btn {
      display: flex;
      font-size: 8px;
    }
    .icon {
      font-size: 13px;
    }
  }
  @media screen and (max-width: 420px) {
    .texts h3 {
      font-size: 15px;
    }
    #span-btn {
      gap: 2px;
    }
  }
`;
