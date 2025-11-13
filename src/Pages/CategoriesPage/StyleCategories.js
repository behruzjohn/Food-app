import styled from 'styled-components';

export const StyleOrderDetail = styled.div`
  height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  .order-detail-nav {
    padding-top: 20px;
  }
  .order-detail-contained {
    display: flex;
    gap: 20px;
    margin-top: 30px;
  }
  .order-detail-contained p {
    margin-top: 10px;
  }
  span {
    color: #f7c604;
  }
  .customer-info {
    flex: 1;
    border-radius: 20px;
    margin-top: 20px;
    background-color: #fff;
    width: 315px;
    height: 500px;
  }
  .customer-info-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    /* padding: 20px; */
    padding-top: 20px;
  }
  .customer-info-nav button {
    color: green;
    background-color: #d9f3ea;
  }
  .customer-info-nav img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid black;
  }
  .note-order {
    margin-top: 10px;
    border-radius: 12px;
    color: #fff;

    background-color: #5e6c93;
  }
  .note-texts {
    padding: 20px;
  }
  .location {
    border-radius: 12px;
    padding: 10px;
    display: flex;

    gap: 10px;
    padding-left: 20px;
    background-color: #2d9cdb;
  }
  .location button {
    border: none;
    color: aqua;
    padding: 8px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  table {
    cursor: pointer;
    width: 100%;
  }

  .order-table {
    flex: 2;
  }
  table thead th {
    padding: 20px;
  }
  table thead {
    color: #fff;
    background-color: #00b074;
  }
  #left-radius {
    border-top-left-radius: 20px;
  }
  #right-radius {
    border-top-right-radius: 20px;
  }
  table tbody {
    background-color: #fff;
  }
  tbody td {
    padding: 10px;
  }
  .card {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .card img {
    width: 65px;
    height: 65px;
    border: 2px solid black;
    border-radius: 12px;
  }
  .card-text p {
    font-size: 10px;
    color: blue;
  }
`;
