import styled from "styled-components";

export const StyleCategories = styled.div`
  padding: 8px 0 40px;

  /* ── Header ── */
  .category-nav {
    margin-top: 24px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;

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
    height: 36px !important;
    &:hover {
      background-color: #ea6a0a !important;
    }
  }

  /* ── Stats pill ── */
  .categories-stats {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
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

  /* ── Cards grid ── */
  .card {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    width: 100%;
  }

  .defualtImage {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    gap: 12px;
    border: 0.5px solid rgba(249, 115, 22, 0.15);
    border-radius: 12px;

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

  /* ── Responsive ── */
  @media (max-width: 600px) {
    header {
      flex-direction: column;
      align-items: flex-start;
      h2 {
        font-size: 17px;
      }
    }

    .MuiButton-containedSuccess {
      width: 100% !important;
    }

    .card {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
  }
`;
