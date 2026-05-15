import styled from "styled-components";

export const StyleOrderItem = styled.div`
  padding: 8px 0 40px;

  .category-nav {
    margin-top: 20px;
  }

  /* ── Info card ── */
  .info-card {
    background: #ffffff;
    border: 0.5px solid rgba(249, 115, 22, 0.15);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.03);
    margin-bottom: 24px;
  }

  /* ── Card top stripe ── */
  .info-card-header {
    background: #fff8f3;
    border-bottom: 0.5px solid rgba(249, 115, 22, 0.12);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .info-card-title {
    font-size: 13px;
    font-weight: 500;
    color: #9e9890;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      font-size: 16px;
      color: #f97316;
    }
  }

  /* ── Status badge ── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: block;
    }

    &.pending {
      background: #faeeda;
      color: #ba7517;
      border: 0.5px solid rgba(186, 117, 23, 0.3);
      &::before {
        background: #ba7517;
      }
    }
    &.cooking {
      background: #fcebeb;
      color: #a32d2d;
      border: 0.5px solid rgba(163, 45, 45, 0.3);
      &::before {
        background: #a32d2d;
      }
    }
    &.delivering {
      background: #e6f1fb;
      color: #185fa5;
      border: 0.5px solid rgba(24, 95, 165, 0.3);
      &::before {
        background: #185fa5;
      }
    }
    &.received {
      background: #eaf3de;
      color: #3b6d11;
      border: 0.5px solid rgba(59, 109, 17, 0.3);
      &::before {
        background: #3b6d11;
      }
    }
  }

  /* ── Card body ── */
  .info-card-body {
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  /* ── Order meta ── */
  .order-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .order-title {
    font-size: 18px;
    font-weight: 500;
    color: #1a1916;
    margin: 0;
  }

  /* ── Location row ── */
  .location-row {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 13px;
    color: #6b6860;

    svg {
      font-size: 16px;
      color: #f97316;
      flex-shrink: 0;
      margin-top: 1px;
    }

    a {
      color: #6b6860;
      text-decoration: none;
      line-height: 1.5;
      transition: color 0.15s;
      &:hover {
        color: #f97316;
      }
    }

    span {
      line-height: 1.5;
    }
  }

  /* ── Total price box ── */
  .total-box {
    background: #fff8f3;
    border: 0.5px solid rgba(249, 115, 22, 0.2);
    border-radius: 10px;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 160px;
    flex-shrink: 0;
  }

  .total-label {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9e9890;
    font-weight: 400;
  }

  .total-price {
    font-size: 24px;
    font-weight: 600;
    color: #1a1916; /* qora — professional */
    white-space: nowrap;
    font-family: sans-serif;
    letter-spacing: -0.02em;

    span {
      font-size: 14px;
      font-weight: 400;
      color: #9e9890;
      margin-left: 4px;
    }
  }

  .total-items {
    font-size: 12px;
    color: #9e9890;
    margin-top: 2px;
  }

  /* ── Section header ── */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    h3 {
      font-size: 15px;
      font-weight: 500;
      color: #1a1916;
      margin: 0;
    }

    span {
      font-size: 12px;
      color: #9e9890;
    }
  }

  /* ── Cards grid ── */
  .card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  /* ── Loading ── */
  .loading-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 20px;
    width: 100%;

    .MuiCircularProgress-root {
      color: #f97316 !important;
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
    width: 100%;
    background: #ffffff;
    border: 0.5px solid rgba(249, 115, 22, 0.15);
    border-radius: 12px;
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    .info-card-header {
      padding: 12px 16px;
    }
    .info-card-body {
      padding: 16px;
      flex-direction: column;
    }

    .total-box {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      padding: 12px 16px;
    }

    .total-price {
      font-size: 20px;
    }
    .order-title {
      font-size: 16px;
    }

    .card {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
  }
`;
