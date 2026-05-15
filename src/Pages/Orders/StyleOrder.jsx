import styled from "styled-components";

export const StyleOrder = styled.div`
  padding: 8px 0 40px;

  /* ── Header ── */
  .main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;

    h2 {
      font-size: 20px;
      font-weight: 500;
      color: #1a1916;
      margin: 0;
    }
  }

  /* ── Add button ── */
  .MuiButton-containedSuccess {
    background-color: #f97316 !important;
    box-shadow: none !important;
    border-radius: 8px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    text-transform: none !important;
    padding: 8px 18px !important;
    &:hover {
      background-color: #ea6a0a !important;
    }
  }

  /* ── Status filter ── */
  #status {
    margin-top: 0;
  }

  /* ── Table wrapper ── */
  .orders-list {
    margin-top: 20px;

    border-radius: 12px;
    overflow: hidden;
  }

  .orders-list-scroll {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0;

    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #faf9f7;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(249, 115, 22, 0.3);
      border-radius: 2px;
    }
  }

  /* ── Table ── */
  table {
    background: #fff;
    width: 100%;
    min-width: 900px;
    border-collapse: separate;
    border-spacing: 0;
  }

  thead {
    background: #ffd900;
    border-bottom: 0.5px solid rgba(249, 115, 22, 0.15);

    th {
      padding: 20px;
      text-align: left;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #fff;
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      border-bottom: 0.5px solid #f4f1eb;
      transition: background 0.15s;

      &:hover {
        background: #fff8f3;
      }
      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 13px 16px;
      font-size: 13px;
      color: #1a1916;
      vertical-align: middle;
    }
  }

  /* ── Order ID ── */
  .order-id {
    font-weight: 500;
    color: #f97316;
    font-size: 13px;
  }

  /* ── Date ── */
  .order-date {
    color: #9e9890;
    font-size: 12px;
    white-space: nowrap;
  }

  /* ── Customer ── */
  .order-customer {
    font-weight: 500;
    color: #1a1916;
    font-size: 13px;
  }

  /* ── Location ── */
  td.location {
    max-width: 200px;
    color: #6b6860;
    font-size: 12px;
    line-height: 1.5;
  }

  /* ── Amount ── */
  td.amount {
    font-weight: 500;
    color: #1a1916;
    white-space: nowrap;
    font-size: 13px;
  }

  /* ── Status chip ── */
  .chip {
    border-radius: 100px !important;
    height: 24px !important;
    font-size: 11px !important;
    font-weight: 500 !important;

    &.MuiChip-colorWarning {
      background: #faeeda !important;
      color: #ba7517 !important;
      border: 0.5px solid rgba(186, 117, 23, 0.3) !important;
    }
    &.MuiChip-colorError {
      background: #fcebeb !important;
      color: #a32d2d !important;
      border: 0.5px solid rgba(163, 45, 45, 0.3) !important;
    }
    &.MuiChip-colorInfo {
      background: #e6f1fb !important;
      color: #185fa5 !important;
      border: 0.5px solid rgba(24, 95, 165, 0.3) !important;
    }
    &.MuiChip-colorSuccess {
      background: #eaf3de !important;
      color: #3b6d11 !important;
      border: 0.5px solid rgba(59, 109, 17, 0.3) !important;
    }
  }

  /* ── Actions menu btn ── */
  .menu-btn {
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    color: #9e9890;
    transition:
      background 0.15s,
      color 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #fff3ea;
      color: #f97316;
    }
  }

  /* ── Empty state ── */
  .defualtImage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    gap: 12px;

    img {
      width: 240px;
      max-width: 100%;
      height: auto;
      object-fit: contain;
      opacity: 0.75;
    }

    p {
      font-size: 14px;
      color: #9e9890;
    }
  }

  /* ── Loading ── */
  .loading-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 20px;

    .MuiCircularProgress-root {
      color: #f97316 !important;
    }
  }

  /* ── Responsive ── */
  @media (max-width: 780px) {
    .main-header h2 {
      font-size: 17px;
    }

    thead th {
      padding: 11px 12px;
      font-size: 10px;
    }
    tbody td {
      padding: 11px 12px;
      font-size: 12px;
    }
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding: 0;

  .MuiPagination-root {
    .MuiButtonBase-root {
      border-radius: 8px !important;
      font-size: 13px !important;

      &.Mui-selected {
        background-color: #f97316 !important;
        color: #fff !important;
      }
      &:hover {
        background-color: #fff3ea !important;
        color: #f97316 !important;
      }
    }
  }
`;
