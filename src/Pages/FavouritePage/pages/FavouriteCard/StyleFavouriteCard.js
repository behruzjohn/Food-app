import styled, { keyframes } from "styled-components";

const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
`;

export const StyleFavouriteCard = styled.div`
  width: 100%;
  animation: ${fadeSlideIn} 0.3s ease both;

  /* ── Card shell ── */
  .card-box {
    display: flex;
    grid-template-columns: 80px 1fr;
    gap: 16px;
    align-items: start;
    background: #ffffff;
    border: 0.5px solid #e4e9f2;
    border-radius: 16px;
    padding: 14px 16px;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &:hover {
      border-color: #cbd5e1;
      box-shadow: 0 4px 18px rgba(12, 21, 38, 0.06);
    }
  }

  /* ── Image ── */
  .img-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff3ee;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      /* graceful broken-image fallback */
      background: #fff3ee;
    }
  }

  /* ── Content ── */
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  /* ── Header ── */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  .food-name {
    font-size: 14px;
    font-weight: 600;
    color: #0c1526;
    line-height: 1.3;
    margin: 0;
    flex: 1;
    min-width: 0;
    /* prevent very long names breaking layout */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .status {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100px;
  }
  /* ── Remove button (ShopCart mode) ── */
  .remove-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    border: 0.5px solid #fecaca;
    border-radius: 8px;
    background: #fef2f2;
    color: #9ca3af;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.15s;
    font-family: inherit;

    svg {
      font-size: 15px !important;
      transition: color 0.15s;
    }

    &:hover {
      background: #dc2626;
      border-color: #dc2626;
      color: #ffffff;
      svg {
        color: #ffffff;
      }
    }
  }

  /* ── Three-dot menu trigger ── */
  .menu-trigger {
    width: 30px;
    height: 30px;
    border: 0.5px solid #e4e9f2;
    border-radius: 8px;
    background: #f8f9fc;
    color: #6b7a99;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s;

    &:hover {
      background: #0c1526;
      border-color: #0c1526;
      color: #ffffff;
    }
  }

  /* ── Description ── */
  .food-desc {
    font-size: 12px;
    color: #6b7a99;
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  /* ── Order meta chips ── */
  .order-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 2px;
  }

  .meta-chip {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .customer-chip {
    background: #eff6ff;
    color: #1d4ed8;
  }

  .price-chip {
    background: #fff3ee;
    color: #e8570a;
  }

  /* ── Price row ── */
  .price-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
  }

  .price-label {
    font-size: 12px;
    color: #6b7a99;
  }

  .price-value {
    font-size: 14px;
    font-weight: 600;
    color: #e8570a;
  }

  /* ── Card footer ── */
  .card-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }

  .controls-wrap {
    display: flex;
    align-items: center;
  }

  /* ── Quantity control ── */
  .qty-control {
    display: flex;
    align-items: center;
    gap: 0;
    background: #f5f6fa;
    border: 0.5px solid #e4e9f2;
    border-radius: 10px;
    overflow: hidden;
    animation: ${popIn} 0.2s ease;
  }

  .qty-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: #0c1526;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.15s,
      color 0.15s;
    line-height: 1;
    font-family: inherit;

    &:hover {
      background: #0c1526;
      color: #ffffff;
    }
  }

  .qty-num {
    min-width: 32px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #0c1526;
    padding: 0 4px;
    border-left: 0.5px solid #e4e9f2;
    border-right: 0.5px solid #e4e9f2;
    line-height: 32px;
    height: 32px;
    display: inline-block;
  }

  /* ── Add to cart button ── */
  .add-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #e8570a;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
    transition:
      background 0.2s,
      transform 0.15s,
      box-shadow 0.2s;

    &:hover {
      background: #d44d06;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(232, 87, 10, 0.28);
    }

    &:active {
      transform: scale(0.97);
    }
  }

  /* ── Responsive ── */
  @media (max-width: 520px) {
    .card-box {
      grid-template-columns: 64px 1fr;
      gap: 12px;
      padding: 12px;
    }

    .img-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 10px;
    }

    .food-name {
      font-size: 13px;
    }

    .food-desc {
      font-size: 11px;
    }

    .remove-btn .remove-label {
      display: none;
    }

    .remove-btn {
      padding: 5px 7px;
    }

    .add-btn {
      font-size: 11px;
      padding: 7px 12px;
    }

    .price-value {
      font-size: 13px;
    }
  }

  @media (max-width: 380px) {
    .food-name {
      font-size: 12px;
    }

    .qty-btn {
      width: 28px;
      height: 28px;
    }

    .qty-num {
      min-width: 28px;
      height: 28px;
      line-height: 28px;
      font-size: 13px;
    }
  }
`;
