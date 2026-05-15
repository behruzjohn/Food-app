import styled from "styled-components";

export const StyleAddFood = styled.div`
  .dialog-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 16px;
    border-bottom: 0.5px solid rgba(249, 115, 22, 0.15);
  }

  .dialog-head-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .dialog-icon {
    width: 38px;
    height: 38px;
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

  .dialog-title {
    font-size: 15px;
    font-weight: 500;
    color: #1a1916;
    margin: 0 0 2px;
  }

  .dialog-subtitle {
    font-size: 12px;
    color: #9e9890;
    margin: 0;
  }

  .dialog-close {
    color: #9e9890 !important;
    &:hover {
      color: #1a1916 !important;
      background: #f4f1eb !important;
    }
  }

  .dialog-body {
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #9e9890;
    margin-bottom: 5px;
  }

  .MuiTextField-root {
    width: 100%;
  }

  .MuiOutlinedInput-root {
    border-radius: 8px;
    font-size: 14px;

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
    }
    input::placeholder {
      color: #c8c4bc;
    }
  }

  .MuiInputLabel-root {
    font-size: 13px;
    color: #9e9890;
    &.Mui-focused {
      color: #f97316;
    }
  }

  .MuiFormHelperText-root {
    font-size: 11px;
    margin-left: 0;
    &.Mui-error {
      color: #e24b4a;
    }
  }

  .MuiMenuItem-root {
    font-size: 13px;
    &:hover {
      background: #fff3ea;
      color: #f97316;
    }
    &.Mui-selected {
      background: #fff3ea !important;
      color: #f97316;
    }
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 8px;
    border-top: 0.5px solid #f0e8e0;
    margin-top: 4px;
  }

  .btn-cancel {
    font-size: 13px !important;
    font-weight: 400 !important;
    text-transform: none !important;
    color: #6b6860 !important;
    border: 0.5px solid #e8e4dc !important;
    border-radius: 8px !important;
    padding: 8px 18px !important;
    box-shadow: none !important;
    &:hover {
      background: #f4f1eb !important;
      border-color: #b0ada6 !important;
    }
  }

  .btn-submit {
    font-size: 13px !important;
    font-weight: 500 !important;
    text-transform: none !important;
    background-color: #f97316 !important;
    color: #fff !important;
    border-radius: 8px !important;
    padding: 8px 20px !important;
    box-shadow: none !important;
    &:hover {
      background-color: #ea6a0a !important;
    }
  }

  @media (max-width: 480px) {
    .row-2 {
      grid-template-columns: 1fr;
    }
  }
`;
