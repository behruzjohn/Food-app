import styled from 'styled-components';

export const StyleOrders = styled.div`
  width: 100%;

  .orders-nav {
    padding: 20px;
  }
  .orders-search {
    display: flex;
    justify-content: space-between;
  }
  .orders-search input {
    background-color: #fff;
    height: 40px;
    width: 100%;
    max-width: 860px;
    box-sizing: border-box;
  }
  .select {
    width: 68px;
  }
  .selectId {
    margin-right: 12px;
  }
  .card {
    display: flex;
    flex-wrap: wrap;
  }
  .shop {
    position: relative;
    display: inline-block;
  }
  .img-with {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .img-with img {
    width: 350px;
    height: 350px;
  }
  .shop .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 50%;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .main-header {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .order-header-btns input {
    height: 15px;
  }

  .orders-list {
    margin-top: 20px;
    width: 100%;
  }
  .orders-list table {
    border-collapse: separate;
    border-spacing: 0 30px;
    color: #fff;
    width: 100%;
  }
  table thead {
    background-color: #00b074;
  }
  thead tr th {
  }
  table tbody {
    color: #000;
    background-color: #fff;
  }
  tbody tr {
    margin-top: 20px;
    margin-left: 20px;
  }
  tbody td button {
    background-color: #fff1ee;
    color: #ff6d4c;
    height: 35px;
    width: 125px;
  }
  tbody td {
    padding: 20px;
  }
  thead th {
    padding: 20px;
  }
  .order-special {
    width: 900px;
    margin-right: 12px;
  }
  @media screen and (max-width: 480px) {
    .main-header {
      display: flex;
      flex-direction: column;
    }
    .order-header-text {
      font-size: 12px;
    }
    .order-header-btns button {
      font-size: 12px;
      margin-top: 10px;
      width: 150px;
      height: 35px;
      padding: 2px;
    }
    .orders-nav {
      margin-right: 0;
    }
    .order-special {
      margin-right: 0px;
    }
  }
`;
