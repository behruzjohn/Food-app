import styled from "styled-components";

export const StyleFoods = styled.div`
  padding: 8px 0 40px;
  width: 100%;
  box-sizing: border-box;

  /* ── Page header ── */
  .foods-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
    margin-bottom: 4px;

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
    transition: background-color 0.15s !important;
    &:hover {
      background-color: #ea6a0a !important;
    }
  }

  /* ── Cards area ── */
  .food-cards {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .food-cards-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;

    @media (max-width: 1280px) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }

  /* ── Admin table wrapper ── */
  .table-card {
    border-radius: 12px;
    overflow: hidden;
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

  /* ── Empty state ── */
  .defualtImage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    gap: 12px;

    img {
      width: 260px;
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

  /* ── Pagination ── */
  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;

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
  }

  /* ── Stats strip (creative touch) ── */
  .foods-stats {
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .stat-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #ffffff;
    border: 0.5px solid rgba(249, 115, 22, 0.18);
    border-radius: 100px;
    padding: 6px 16px 6px 10px;
    font-size: 13px;
    color: #6b6860;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.04);

    .stat-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #f97316;
      flex-shrink: 0;
    }

    strong {
      font-weight: 500;
      color: #1a1916;
    }
  }

  /* ── Shop cart page ── */
  &.shop-cart-page {
    .shop-cart-title h2 {
      font-size: 20px;
      font-weight: 500;
      color: #1a1916;
      margin-bottom: 4px;

      span {
        color: #9e9890;
        font-size: 15px;
        font-weight: 400;
      }
    }

    .shop-cart-title p {
      font-size: 13px;
      color: #9e9890;
      line-height: 1.6;
    }

    .cart-summary-cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(120px, 1fr));
      gap: 10px;
      margin-left: auto;
      width: min(480px, 100%);
    }

    .summary-card {
      background: #ffffff;
      border: 0.5px solid rgba(249, 115, 22, 0.15);
      border-radius: 10px;
      padding: 14px;
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.03);

      p {
        font-size: 12px;
        color: #9e9890;
        margin-bottom: 4px;
      }
      h4 {
        font-size: 18px;
        font-weight: 500;
        color: #1a1916;
      }
    }

    .modern-no-cart {
      background: #ffffff;
      border: 0.5px solid rgba(249, 115, 22, 0.15);
      border-radius: 12px;
      margin-top: 16px;
      padding: 60px 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .no-cart-text {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;

      h3 {
        font-size: 18px;
        font-weight: 500;
        color: #1a1916;
      }
      p {
        font-size: 13px;
        color: #9e9890;
        line-height: 1.6;
        max-width: 400px;
      }
    }
  }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .addSpan {
      display: none;
    }

    #special button {
      min-width: 36px !important;
      width: 36px !important;
      height: 36px !important;
      padding: 0 !important;
      border-radius: 8px !important;
    }

    .foods-header h2 {
      font-size: 17px;
    }
    .foods-stats {
      gap: 8px;
    }
    .stat-pill {
      font-size: 12px;
      padding: 5px 12px 5px 8px;
    }

    &.shop-cart-page {
      .cart-summary-cards {
        grid-template-columns: 1fr;
        width: 100%;
      }
    }
  }
`;
