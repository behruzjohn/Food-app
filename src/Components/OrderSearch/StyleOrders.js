import styled from 'styled-components';

export const StyleOrders = styled.div`
  width: 100%;

  .orders-search {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
  }

  .input input {
    width: 100%;
    height: 45px;
    padding: 10px 12px;
    box-sizing: border-box;
    border-radius: 8px;
  }
  .input input {
    width: 100%;
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
    width: 450px;
    height: 450px;
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
    width: 100%;
  }
  .orders-list table {
    border-collapse: separate;
    border-spacing: 0 30px;
    color: #fff;
    width: 100%;
  }
  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }
  table thead {
    background-color: #ffd900ff;
  }
  table thead th {
    border-top: 2px solid;
    border-bottom: 2px solid;
    padding: 18px;
  }
  table thead th:first-child {
    border-top-left-radius: 12px;
  }

  table thead th:last-child {
    border-top-right-radius: 12px;
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
    width: 100%;
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
    .orders-search {
      flex-direction: column;
      gap: 10px;
    }
    .input {
      width: 100%;
      min-width: 0;
    }
    .profile {
      margin-top: 20px;
    }
  }
`;
