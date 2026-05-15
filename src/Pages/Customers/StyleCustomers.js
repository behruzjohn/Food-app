import styled from "styled-components";

export const StyleCustomers = styled.div`
  padding: 8px 0 40px;

  /* ── Header ── */
  .main-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 4px;

    h2 {
      font-size: 20px;
      font-weight: 500;
      color: #1a1916;
      margin: 0 0 4px;
    }

    p {
      font-size: 13px;
      color: #9e9890;
      margin: 0;
    }
  }

  /* ── Table wrapper ── */
  .orders-list {
    margin-top: 20px;
    background: #ffffff;
    border: 0.5px solid rgba(249, 115, 22, 0.15);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.03);
  }

  .orders-list-nav {
    width: 100%;
    overflow-x: auto;

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
    background-color: #fff;
    width: 100%;
    min-width: 900px;
    border-collapse: collapse;
    border-spacing: 0;
  }

  thead {
    background-color: #7ddd29;
    color: #fff;
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

  /* ── ID cell ── */
  .cell-id {
    font-size: 12px;
    font-weight: 500;
    color: #f97316;
    font-family: monospace;
    background: rgba(249, 115, 22, 0.08);
    border: 0.5px solid rgba(249, 115, 22, 0.2);
    border-radius: 6px;
    padding: 3px 8px;
    display: inline-block;
  }

  /* ── Date ── */
  .cell-date {
    font-size: 12px;
    color: #9e9890;
    white-space: nowrap;
  }

  /* ── Name with avatar ── */
  .cell-name {
    display: flex;
    align-items: center;
    gap: 10px;

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(
        135deg,
        rgba(249, 115, 22, 0.15),
        rgba(249, 115, 22, 0.3)
      );
      border: 0.5px solid rgba(249, 115, 22, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 500;
      color: #f97316;
      flex-shrink: 0;
      text-transform: uppercase;
    }

    span {
      font-size: 13px;
      font-weight: 500;
      color: #1a1916;
    }
  }

  /* ── Phone link ── */
  .cell-phone a {
    color: #f97316;
    text-decoration: none;
    font-size: 13px;
    transition: opacity 0.15s;
    &:hover {
      opacity: 0.75;
    }
  }

  /* ── Telegram ── */
  .cell-telegram {
    font-size: 12px;
    color: #6b6860;
  }

  /* ── Role chip ── */
  .MuiChip-root {
    border-radius: 100px !important;
    height: 24px !important;
    font-size: 11px !important;
    font-weight: 500 !important;

    &.MuiChip-colorInfo {
      background: rgba(249, 115, 22, 0.1) !important;
      color: #f97316 !important;
      border: 0.5px solid rgba(249, 115, 22, 0.3) !important;
    }
    &.MuiChip-colorDefault {
      background: #f4f1eb !important;
      color: #6b6860 !important;
      border: 0.5px solid #e8e4dc !important;
    }
  }

  /* ── Empty ── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    gap: 12px;
    color: #9e9890;
    font-size: 14px;
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
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
