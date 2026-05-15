import styled from "styled-components";

export const StyledLayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #fff8f3;
  background-image:
    radial-gradient(
      circle at 0% 0%,
      rgba(249, 115, 22, 0.04) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 100% 100%,
      rgba(249, 115, 22, 0.03) 0%,
      transparent 40%
    );

  .content {
    flex: 1;
    margin-left: 240px;
    padding: 28px;
    transition: margin-left 0.25s ease;
    min-height: 100vh;
    min-width: 0; /* ✅ bu qo'shing — flex child overflow ni hal qiladi */
    overflow-x: hidden; /* ✅ bu ham */

    @media (max-width: 600px) {
      margin-left: 0;
      padding: 12px; /* 16px → 12px */
    }
  }

  @media (max-width: 600px) {
    &::after {
      content: "";
      display: ${({ $openHeaderDashboard }) =>
        $openHeaderDashboard ? "block" : "none"};
      position: fixed;
      inset: 0;
      background: rgba(26, 25, 22, 0.35);
      z-index: 11;
      backdrop-filter: blur(2px);
    }
  }
`;

export const StyleHeaderDashboard = styled.aside`
  width: 240px;
  min-height: 100vh;
  background: #ffffff;
  border-right: 0.5px solid rgba(249, 115, 22, 0.15);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
  transition: transform 0.25s ease;
  box-shadow: 4px 0 24px rgba(249, 115, 22, 0.04);

  /* Logo area */
  img {
    width: 120px;
    height: auto;
    object-fit: contain;
    margin: 28px auto 8px;
    display: block;
  }

  /* Toggle button — mobile only */
  #sidebarToggle {
    display: none;
    position: absolute;
    top: 16px;
    right: -44px;
    min-width: 36px !important;
    width: 36px;
    height: 36px;
    padding: 0 !important;
    border-radius: 8px !important;
    background: #ffffff !important;
    border: 0.5px solid rgba(249, 115, 22, 0.2) !important;
    color: #f97316 !important;
    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.1) !important;
    z-index: 30;

    @media (max-width: 600px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* Nav links */
  .header-nav {
    flex: 1;
    overflow-y: auto;
    padding: 8px 12px;
    margin-top: 8px;

    &::-webkit-scrollbar {
      width: 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    li {
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;

      a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 11px 14px;
        text-decoration: none;
        color: #6b6860;
        font-size: 15px; /* 13 → 15 */
        font-weight: 400;
        border-radius: 8px;
        transition: color 0.15s;
        white-space: nowrap;

        svg {
          font-size: 20px; /* 18 → 20 */
          flex-shrink: 0;
          color: #c8a898;
          transition: color 0.15s;
        }
      }

      &:hover {
        background: #fff3ea;
        a {
          color: #f97316;
          svg {
            color: #f97316;
          }
        }
      }

      &.active {
        background: #fff3ea;
        border: 0.5px solid rgba(249, 115, 22, 0.2);

        a {
          color: #f97316;
          font-weight: 500;
          svg {
            color: #f97316;
          }
        }

        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 2px;
          border-radius: 0 2px 2px 0;
          background: #f97316;
        }
      }
    }
  }

  /* Divider before logout */
  #logOut {
    margin: 0 !important;
    padding: 16px 20px !important;
    border-radius: 0 !important;
    font-size: 15px !important; /* 13 → 15 */
    font-weight: 400 !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    justify-content: flex-start !important;
    color: #6b6860 !important; /* to'q rang — ko'rinadi */
    border-top: 0.5px solid #fde8d8 !important;
    width: 100% !important;
    transition:
      background 0.15s,
      color 0.15s !important;

    &:hover {
      background: #fff3ea !important;
      color: #e24b4a !important;
      svg {
        color: #e24b4a !important;
      }
    }

    .span-title {
      margin-left: 4px;
      font-size: 15px;
    }

    svg {
      font-size: 20px !important; /* 17 → 20 */
      color: #9e9890 !important;
      transition: color 0.15s;
    }
  }

  /* Mobile: slide in/out */
  @media (max-width: 600px) {
    transform: ${({ $openHeaderDashboard }) =>
      $openHeaderDashboard ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: ${({ $openHeaderDashboard }) =>
      $openHeaderDashboard ? "4px 0 32px rgba(249,115,22,0.12)" : "none"};
  }
`;
