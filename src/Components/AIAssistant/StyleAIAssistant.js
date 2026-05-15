import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(249,115,22,0); }
`;

const typingDot = keyframes`
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%           { transform: translateY(-6px); opacity: 1; }
`;

export const FloatingBtn = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #f97316, #fb923c);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2.5s infinite;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 26px;
    color: #fff;
  }

  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 18px;
    height: 18px;
    background: #22c55e;
    border-radius: 50%;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
  }

  @media (max-width: 480px) {
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
`;

export const ModalWrap = styled.div`
  position: fixed;
  bottom: 96px;
  right: 28px;
  z-index: 999;
  width: 420px;
  height: 620px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgba(15, 15, 20, 0.95);
  border: 1px solid rgba(249, 115, 22, 0.25);
  box-shadow:
    0 0 0 1px rgba(249, 115, 22, 0.1),
    0 32px 64px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: ${fadeIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (max-width: 480px) {
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100dvh;
    border-radius: 20px 20px 0 0;
  }
`;

export const ModalHeader = styled.div`
  padding: 16px 20px;
  background: rgba(249, 115, 22, 0.08);
  border-bottom: 1px solid rgba(249, 115, 22, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ai-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #fb923c);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(249, 115, 22, 0.4);
  }

  .ai-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ai-name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
  }

  .ai-status {
    font-size: 11px;
    color: #22c55e;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      display: block;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: rgba(249, 115, 22, 0.2);
      color: #f97316;
    }
  }
`;

export const MessagesWrap = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(249, 115, 22, 0.3);
    border-radius: 2px;
  }
`;

export const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  animation: ${fadeIn} 0.25s ease;

  .bubble-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "row")};
  }

  .mini-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #fb923c);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .bubble {
    max-width: 280px;
    padding: 10px 14px;
    border-radius: ${({ $isUser }) =>
      $isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px"};
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-line;

    ${({ $isUser }) =>
      $isUser
        ? css`
            background: linear-gradient(135deg, #f97316, #ea6a0a);
            color: #fff;
          `
        : css`
            background: rgba(255, 255, 255, 0.07);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: rgba(255, 255, 255, 0.9);
          `}
  }

  .timestamp {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.25);
    padding: 0 4px;
  }
`;

export const FoodsGrid = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 4px 2px 8px;
  width: 100%;

  &::-webkit-scrollbar {
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(249, 115, 22, 0.3);
    border-radius: 2px;
  }
`;

export const FoodCardWrap = styled.div`
  flex-shrink: 0;
  width: 150px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 14px;
  overflow: hidden;
  transition:
    transform 0.2s,
    border-color 0.2s;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(249, 115, 22, 0.5);
  }

  img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    display: block;
  }

  .food-info {
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .food-name {
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .food-price {
    font-size: 12px;
    font-weight: 600;
    color: #f97316;
  }

  .food-category {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }

  .add-btn {
    width: 100%;
    padding: 6px;
    border: none;
    background: rgba(249, 115, 22, 0.15);
    color: #f97316;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    border-top: 1px solid rgba(249, 115, 22, 0.15);
    transition: background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
      background: rgba(249, 115, 22, 0.3);
    }
    &.added {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
      border-top-color: rgba(34, 197, 94, 0.15);
    }
  }
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  animation: ${fadeIn} 0.2s ease;

  .mini-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #fb923c);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .dots {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px 16px 16px 4px;
    padding: 10px 16px;
    display: flex;
    gap: 5px;
    align-items: center;

    span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(249, 115, 22, 0.8);
      animation: ${typingDot} 1.2s ease infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
`;

export const SuggestionsWrap = styled.div`
  padding: 8px 16px 10px;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &::-webkit-scrollbar {
    display: none;
  }

  button {
    flex-shrink: 0;
    padding: 5px 12px;
    border-radius: 100px;
    border: 1px solid rgba(249, 115, 22, 0.3);
    background: rgba(249, 115, 22, 0.08);
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background 0.15s,
      color 0.15s,
      border-color 0.15s;

    &:hover {
      background: rgba(249, 115, 22, 0.2);
      color: #f97316;
      border-color: rgba(249, 115, 22, 0.6);
    }
  }
`;

export const InputWrap = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;

  textarea {
    flex: 1;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 13px;
    color: #fff;
    resize: none;
    outline: none;
    font-family: inherit;
    line-height: 1.5;
    max-height: 100px;
    transition: border-color 0.15s;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
    &:focus {
      border-color: rgba(249, 115, 22, 0.5);
    }
  }

  .send-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #f97316, #ea6a0a);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition:
      opacity 0.15s,
      transform 0.15s;
    font-size: 18px;

    &:hover {
      opacity: 0.88;
    }
    &:active {
      transform: scale(0.95);
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;
