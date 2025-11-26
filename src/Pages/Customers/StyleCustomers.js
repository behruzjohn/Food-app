import styled from 'styled-components';

export const StyleCustomers = styled.div`
  width: 100%;

  .orders-search {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }
  .orders-search input {
    background-color: #fff;
    height: 35px;
    width: 100%;
    max-width: 860px;
    box-sizing: border-box;
  }
  table thead th:first-child {
    border-top-left-radius: 12px;
  }
  table thead th:last-child {
    border-top-right-radius: 12px;
  }

  .select {
    width: 68px;
  }
  .selectId {
    margin-right: 12px;
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
    width: 100%;
    max-width: 450px;
    height: auto;
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
    flex-wrap: wrap;
  }
  .main-header {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
    gap: 10px;
  }
  .order-header-btns input {
    height: 15px;
  }
  .orders-list {
    margin-top: 20px;
    width: 100%;
    overflow-x: auto;
  }
  .orders-list table {
    border-collapse: separate;
    border-spacing: 0 4px;
    color: #fff;
    width: 100%;
    min-width: 600px;
  }
  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }
  table thead {
    background-color: #00b074;
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

  @media (max-width: 1200px) {
    .orders-search input {
      max-width: 600px;
    }
    .img-with img {
      max-width: 350px;
    }
    tbody td button {
      width: 100px;
    }
  }

  @media (max-width: 900px) {
    .orders-search input {
      max-width: 100%;
    }
    .main-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .img-with img {
      max-width: 300px;
    }
  }

  @media (max-width: 600px) {
    .img-with img {
      max-width: 250px;
    }
    tbody td {
      padding: 10px;
    }
    thead th {
      padding: 10px;
    }
    tbody td button {
      width: 80px;
      height: 30px;
    }
  }
`;
