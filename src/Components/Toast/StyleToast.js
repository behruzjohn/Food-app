import { Alert } from "@mui/material";
import styled from "styled-components";

export const StyledAlert = styled(Alert)`
  width: auto !important;
  min-width: 220px !important;
  max-width: 360px !important;
  border-radius: 10px !important;
  padding: 10px 16px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  box-shadow: 0 4px 16px rgba(26, 25, 22, 0.1) !important;
  align-items: center !important;
  border: 0.5px solid !important;

  &.toast-success {
    background: #ffffff !important;
    color: #2d6a1f !important;
    border-color: rgba(99, 153, 34, 0.3) !important;
    .MuiAlert-icon {
      color: #639922 !important;
    }
  }

  &.toast-error {
    background: #ffffff !important;
    color: #a32d2d !important;
    border-color: rgba(226, 75, 74, 0.3) !important;
    .MuiAlert-icon {
      color: #e24b4a !important;
    }
  }

  &.toast-info {
    background: #ffffff !important;
    color: #185fa5 !important;
    border-color: rgba(55, 138, 221, 0.3) !important;
    .MuiAlert-icon {
      color: #378add !important;
    }
  }

  .MuiAlert-icon {
    font-size: 18px !important;
    padding: 0 !important;
    margin-right: 10px !important;
  }

  .MuiAlert-action {
    padding: 0 0 0 12px !important;
    .MuiIconButton-root {
      color: inherit !important;
      opacity: 0.5;
      &:hover {
        opacity: 1;
        background: transparent !important;
      }
    }
  }

  .MuiAlert-message {
    padding: 0 !important;
    line-height: 1.5;
  }
`;
