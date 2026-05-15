import styled from "styled-components";

export const StyleOrders = styled.div`
  width: 100%;

  .orders-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 0.5px solid #f0e8e0;
    flex-wrap: wrap;
  }

  /* ── Search input ── */
  #order-special {
    flex: 1;
    min-width: 0;
    max-width: 400px;

    .input {
      width: 100%;

      .MuiOutlinedInput-root {
        border-radius: 8px;
        font-size: 13px;
        background: #fff;
        height: 38px;

        fieldset {
          border-color: #f0e8e0;
          border-width: 0.5px;
        }
        &:hover fieldset {
          border-color: rgba(249, 115, 22, 0.4);
        }
        &.Mui-focused fieldset {
          border-color: #f97316;
          border-width: 1px;
        }

        input {
          font-size: 13px;
          color: #1a1916;
          padding: 8px 14px;
          &::placeholder {
            color: #c8c4bc;
          }
        }

        svg {
          font-size: 18px;
          color: #c8a898;
        }
      }
    }
  }

  /* ── Profile row ── */
  .profile {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  /* ── Cart icon ── */
  .shop {
    position: relative;
    cursor: pointer;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: #fff3ea;
    border: 0.5px solid rgba(249, 115, 22, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.15s,
      border-color 0.15s;
    flex-shrink: 0;

    &:hover {
      background: rgba(249, 115, 22, 0.15);
      border-color: rgba(249, 115, 22, 0.5);
    }

    svg {
      font-size: 20px;
      color: #f97316;
      display: block;
    }

    .badge {
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      background: #f97316;
      color: #fff;
      font-size: 10px;
      font-weight: 600;
      border-radius: 100px;
      border: 2px solid #fff8f3;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      z-index: 1;
    }
  }

  /* ── Lang select ── */
  .selectId {
    margin: 0 !important;

    .MuiOutlinedInput-root {
      border-radius: 8px;
      font-size: 13px;
      height: 38px;

      fieldset {
        border-color: #f0e8e0;
        border-width: 0.5px;
      }
      &:hover fieldset {
        border-color: rgba(249, 115, 22, 0.4);
      }
      &.Mui-focused fieldset {
        border-color: #f97316;
        border-width: 1px;
      }
    }

    .MuiInputLabel-root {
      font-size: 13px;
      color: #9e9890;
      &.Mui-focused {
        color: #f97316;
      }
    }

    .select {
      min-width: 100px;
    }
  }

  /* ── Greeting ── */
  .profile > p {
    font-size: 13px;
    color: #6b6860;
    margin: 0;
    white-space: nowrap;

    strong {
      color: #1a1916;
      font-weight: 500;
    }
  }

  /* ── Avatar ── */
  .MuiAvatar-root {
    width: 36px !important;
    height: 36px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    background: linear-gradient(135deg, #f97316, #fb923c) !important;
    cursor: pointer;
    transition: opacity 0.15s;
    &:hover {
      opacity: 0.85;
    }
  }

  /* ── Dropdown menu ── */
  .MuiMenu-paper {
    border-radius: 10px !important;
    border: 0.5px solid rgba(249, 115, 22, 0.15) !important;
    box-shadow: 0 4px 16px rgba(26, 25, 22, 0.08) !important;
    min-width: 180px !important;
    overflow: hidden !important;

    .MuiMenuItem-root {
      font-size: 13px !important;
      padding: 10px 14px !important;
      transition: background 0.15s !important;
      background: #fff !important;

      &:hover {
        background: #fff3ea !important;
      }

      .MuiListItemIcon-root {
        min-width: 32px !important;
        svg {
          font-size: 18px !important;
        }
      }

      .MuiTypography-root {
        font-size: 13px !important;
      }
    }
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    .orders-search {
      gap: 10px;
      padding: 10px 0;
    }

    #order-special {
      max-width: 100%;
      width: 100%;
      order: 2;
    }

    .profile {
      width: 100%;
      order: 1;
      justify-content: flex-end;
      gap: 8px;

      > p {
        display: none;
      }
    }

    .shop {
      width: 34px;
      height: 34px;
      svg {
        font-size: 18px;
      }
    }
  }
`;
