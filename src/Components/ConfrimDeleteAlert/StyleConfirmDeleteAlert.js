import styled from "styled-components";

export const StyleDeleteModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 380px;
  background: #ffffff;
  border: 0.5px solid rgba(249, 115, 22, 0.15);
  border-radius: 12px;
  box-shadow:
    0 0 0 4px rgba(249, 115, 22, 0.04),
    0 24px 48px rgba(26, 25, 22, 0.12);
  overflow: hidden;
  outline: none;

  .modal-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 28px 24px;
    gap: 16px;
    border-bottom: 0.5px solid #f0e8e0;
  }

  .warning-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #fff3ea;
    border: 0.5px solid rgba(249, 115, 22, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 24px;
      color: #f97316;
    }
  }

  .modal-texts {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .modal-title {
    font-size: 16px;
    font-weight: 500;
    color: #1a1916;
    margin: 0;
  }

  .modal-desc {
    font-size: 13px;
    color: #9e9890;
    line-height: 1.65;
    margin: 0;
    max-width: 280px;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    padding: 16px 20px;
    background: #faf9f7;

    button {
      flex: 1;
      height: 38px;
      border-radius: 8px !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      text-transform: none !important;
      box-shadow: none !important;
    }
  }

  .btn-cancel {
    border: 0.5px solid #e8e4dc !important;
    color: #6b6860 !important;
    background: #ffffff !important;
    &:hover {
      background: #f4f1eb !important;
      border-color: #b0ada6 !important;
    }
  }

  .btn-delete {
    background: #e24b4a !important;
    color: #ffffff !important;
    border: none !important;
    &:hover {
      background: #c73b3a !important;
    }
  }
`;
