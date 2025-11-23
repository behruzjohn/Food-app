import styled from '@emotion/styled';

export const StyleCustomer = styled.div`
  width: 100%;

  .orders-list .orders-list-scroll {
    overflow-x: auto;
    width: 100%;
  }
  .orders-nav {
    padding: 20px;
  }
  .orders-search {
    display: flex;
    justify-content: space-between;
  }
  .orders-search input {
    background-color: #fff;
    width: 900px;
    height: 10px;
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
  table {
    width: 100%;
    border-collapse: collapse;
  }

  .orders-list {
    margin-top: 20px;
    width: 100%;
  }
  .orders-list table {
    border-spacing: 0 10px;
    color: #fff;
    width: 100%;
    border-collapse: collapse;
  }
  table thead {
    background-color: #2d9cdb;
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
    background-color: #ededee;
    color: black;
    height: 30px;
    width: 10px !important;
  }
  table thead th:first-child {
    border-top-left-radius: 12px;
  }

  table thead th:last-child {
    border-top-right-radius: 12px;
  }
  tbody td {
    padding: 20px;
  }
  thead th {
    padding: 20px;
  }
  .orders-list-nav {
    overflow-x: auto;
    width: 100%;
  }
`;
