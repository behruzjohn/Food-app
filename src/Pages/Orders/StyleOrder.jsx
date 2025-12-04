import styled from 'styled-components';

export const StyleOrder = styled.div`
  width: 100%;

  .main-header {
    align-items: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .orders-list-scroll {
    padding-bottom: 50px;
    overflow: auto;
    width: 100%;
  }
  .order-header-btns input {
    height: 15px;
  }

  .orders-list {
    width: 100%;
  }

  .orders-list table {
    width: 100%;
    border-collapse: collapse;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    min-width: 900px;
  }

  table thead {
    background-color: #ffd900;
    color: #fff;
  }

  table thead th {
    padding: 20px;
    border-bottom: 2px solid #ddd;
    text-align: left;
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

  table tbody tr {
    cursor: pointer;
    height: 48px !important;
    margin-top: 20px;
    transition: background-color 0.3s ease-in-out;
  }
  tbody tr:hover {
    background-color: #e3dddd;
  }

  tbody td button {
    background-color: #fff1ee;
    color: #ff6d4c;
    height: 35px;
    width: 125px;
  }
  .chip {
    border-radius: 8px;
    width: 100px;
  }
  table tbody td {
    padding: 20px;
    vertical-align: middle;
  }
  thead th {
    padding: 20px;
  }

  .order-special {
    width: 100%;
    margin-right: 12px;
  }
  .defualtImage {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .defualtImage img {
    width: 400px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media screen and (max-width: 780px) {
    .order-header-text {
      font-size: 12px;
    }
    .defualtImage img {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }

    .order-header-btns button {
      font-size: 12px;
      margin-top: 10px;
      width: 150px;
      height: 35px;
      padding: 2px;
    }
    .chip {
      border-radius: 8px;
      width: 80px;
    }

    .orders-nav {
      margin-right: 0;
    }

    .order-special {
      margin-right: 0px;
    }
    .main-header button {
      width: 150px;
      height: 30px;
    }
    table {
      font-size: 10px;
    }
    table tbody td {
      padding: 16px;
    }
    table thead th {
      padding: 16px;
    }
  }
`;

export const PaginationWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
  padding-left: 90px;
  z-index: 999;

  @media (max-width: 768px) {
    bottom: 0;
    padding-left: 0;
    padding: 5px 0;
  }
`;
