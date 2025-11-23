import styled from 'styled-components';

export const StyleOrder = styled.div`
  width: 100%;

  .main-header {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .orders-list-scroll {
    overflow-x: auto;
    width: 100%;
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
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  tbody tr:hover {
    background-color: #e3dddd;
    transform: scale(1);
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
