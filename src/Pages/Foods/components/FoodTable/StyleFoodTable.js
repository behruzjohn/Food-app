import styled from 'styled-components';

export const OrderTable = styled.div`
  width: 100%;
  margin-top: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    min-width: 900px;
  }

  thead {
    background-color: red;
    color: #fff;
  }
  .orders-list-scroll {
    overflow: auto;
    width: 100%;
  }

  thead th {
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

  tbody tr {
    height: 48px !important;
    margin-top: 20px;
    transition: background-color 0.3s ease-in-out;
  }

  tbody td {
    padding: 20px;
    vertical-align: middle;
    vertical-align: middle;
  }
  thead th {
    padding: 23px;
  }

  td.location {
    max-width: 280px;
    line-height: 1.4;
    font-size: 13px;
  }

  td.amount {
    font-weight: 600;
    white-space: nowrap;
  }

  td.actions {
    text-align: right;
  }

  .status {
    padding: 6px 14px;
    border-radius: 18px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
  }

  .menu-btn {
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    font-size: 30px;
    transition: background 0.2s;
  }

  table img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    table {
      min-width: 900px;
      font-size: 12px;
    }
    tbody td {
      padding: 16px;
    }
  }
`;
