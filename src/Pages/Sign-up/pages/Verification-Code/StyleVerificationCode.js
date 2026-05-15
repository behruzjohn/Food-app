import styled from "styled-components";
import { StyleSignIn } from "../../../Sign-in/StyleSign-in";

export const StyleVerificationCode = styled(StyleSignIn)`
  .container {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border: 0.5px solid rgba(249, 115, 22, 0.2);
    border-radius: 12px;
    padding: 40px 36px;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.04);
  }

  .container-nav {
    margin-bottom: 28px;
    padding-bottom: 24px;
    border-bottom: 0.5px solid #fde8d8;
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 0;
  }

  .form-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #fff3ea;
    border: 0.5px solid rgba(249, 115, 22, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    svg {
      font-size: 18px;
      color: #f97316;
    }
  }

  .form-header-text h1 {
    font-size: 16px;
    font-weight: 500;
    color: #1a1916;
    margin: 0 0 2px;
  }

  .form-header-text p {
    font-size: 13px;
    color: #9e9890;
    margin: 0;
  }

  .otp-hint {
    font-size: 12px;
    color: #9e9890;
    background: #fff8f3;
    border: 0.5px solid rgba(249, 115, 22, 0.2);
    border-radius: 8px;
    padding: 10px 14px;
    margin-top: 20px;
    line-height: 1.6;

    strong {
      color: #f97316;
    }
  }

  .MuiOtpInput-root {
    gap: 10px !important;
    margin-top: 24px !important;
  }

  .MuiOtpInput-TextField {
    .MuiOutlinedInput-root {
      border-radius: 8px;
      font-size: 20px;
      font-weight: 500;
      color: #1a1916;
      height: 52px;
      width: 52px;

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
  }

  .MuiOtpInput-TextField.error {
    .MuiOutlinedInput-root fieldset {
      border-color: #e24b4a !important;
    }
    input {
      color: #e24b4a !important;
    }
  }

  .timer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  .timer-label {
    font-size: 12px;
    color: #9e9890;
  }

  .timer-value {
    font-size: 13px;
    font-weight: 500;
    color: #f97316;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
  }

  .timer-value.expiring {
    color: #e24b4a;
  }

  .timer-bar-track {
    height: 2px;
    background: #fde8d8;
    border-radius: 1px;
    margin-top: 8px;
    overflow: hidden;
  }

  .timer-bar-fill {
    height: 100%;
    background: #f97316;
    border-radius: 1px;
    transition:
      width 1s linear,
      background-color 0.3s;
  }

  .timer-bar-fill.expiring {
    background: #e24b4a;
  }

  .error-msg {
    font-size: 12px;
    color: #c0440a;
    margin-top: 16px;
    padding: 10px 12px;
    background: #fff3ea;
    border-radius: 8px;
    border: 0.5px solid rgba(249, 115, 22, 0.3);
    display: flex;
    align-items: center;
    gap: 8px;
    svg {
      font-size: 15px;
      color: #f97316;
      flex-shrink: 0;
    }
  }

  .resultContainer {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .submit-btn {
    width: 100%;
    padding: 11px !important;
    border-radius: 8px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    background-color: #f97316 !important;
    color: #ffffff !important;
    box-shadow: none !important;
    transition: background-color 0.15s !important;

    &:hover {
      background-color: #ea6a0a !important;
    }
    &:disabled {
      background-color: #fde8d8 !important;
      color: #f0b48a !important;
    }
  }

  .back-link {
    font-size: 13px;
    color: #9e9890;
    text-align: center;

    a {
      color: #f97316;
      text-decoration: none;
      transition: opacity 0.15s;
      &:hover {
        opacity: 0.75;
      }
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 32px 20px;
    }

    .MuiOtpInput-TextField {
      .MuiOutlinedInput-root {
        height: 46px;
        width: 46px;
        font-size: 18px;
      }
    }
  }
`;
