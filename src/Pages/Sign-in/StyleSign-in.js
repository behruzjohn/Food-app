import styled from "styled-components";

export const StyleSignIn = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff8f3;
  background-image:
    radial-gradient(
      circle at 15% 50%,
      rgba(249, 115, 22, 0.07) 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 85% 20%,
      rgba(249, 115, 22, 0.05) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 60% 90%,
      rgba(249, 115, 22, 0.04) 0%,
      transparent 35%
    );
  font-family: "DM Sans", sans-serif;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(249, 115, 22, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(249, 115, 22, 0.06) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    pointer-events: none;
  }

  .sign-in-nav {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1.5rem;
  }

  .form {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border: 0.5px solid rgba(249, 115, 22, 0.2);
    border-radius: 12px;
    padding: 40px 36px;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.04);
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 24px;
    margin-bottom: 28px;
    border-bottom: 0.5px solid #fde8d8;
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

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .MuiTextField-root,
  .MuiTelInput-root,
  .MuiAutocomplete-root {
    width: 100% !important;
  }

  .MuiOutlinedInput-root {
    border-radius: 8px;
    font-size: 14px;
    background: #ffffff;

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
    &.Mui-error fieldset {
      border-color: #e24b4a;
    }

    input {
      font-size: 14px;
      color: #1a1916;
      padding: 11px 14px;
    }
    input::placeholder {
      color: #c8c4bc;
    }
    svg {
      font-size: 16px;
      color: #c8a898;
    }
  }

  .MuiFormHelperText-root {
    font-size: 12px;
    margin-left: 0;
    &.Mui-error {
      color: #e24b4a;
    }
  }

  .MuiInputLabel-root {
    font-size: 14px;
    color: #9e9890;
    &.Mui-focused {
      color: #f97316;
    }
  }

  .form-link {
    font-size: 13px;
    color: #f97316;
    text-decoration: none;
    transition: opacity 0.15s;
    &:hover {
      opacity: 0.75;
    }
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

  .error-msg {
    font-size: 12px;
    color: #c0440a;
    margin-top: 8px;
    padding: 10px 12px;
    background: #fff3ea;
    border-radius: 8px;
    border: 0.5px solid rgba(249, 115, 22, 0.3);
  }

  @media (max-width: 480px) {
    .form {
      padding: 32px 20px;
    }
  }
`;
