import styled from 'styled-components';

export const StyleCategoryInfo = styled.div`
  .continer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .img-with {
    justify-content: center;
    margin-left: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img-with button {
    margin-right: 70px;
  }
  #undefind {
    margin-top: 50px;
    width: 450px;
    height: 400px;
    object-fit: contain;
  }
  .category-banner {
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .category-banner::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  .category-banner img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    transition: transform 0.3s ease;
  }

  .category-banner h2 {
    position: relative;
    z-index: 2;
    color: #fff;
    font-size: 80px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 800px) {
    .img-with {
      margin-left: 0;
      margin-top: 50px;
    }
    .img-with button {
      font-size: 10px;
      margin-right: 50px;
    }
    #undefind {
      margin-left: 0;
      width: 100%;
      max-width: 350px;
      height: auto;
      display: block;
      margin-inline: auto;
    }
    .continer button {
      height: 35px;
      font-size: 12px;
    }
    .category-banner {
      height: 200px;
    }
    .category-banner h2 {
      font-size: 50px;
    }
    .continer button {
      width: 115px;
      font-size: 11px;
    }
    .goBackIcon {
      font-size: 13px !important;
    }
  }
`;
