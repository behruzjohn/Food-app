import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  color: #0f172a;
  padding: 28px 24px;
  font-family: "Poppins", sans-serif;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
  margin-top: 20px;
`;

export const TitleBlock = styled.div`
  h2 {
    font-size: 22px;
    font-weight: 600;
    color: #0f172a;

    span {
      color: #f97316;
    }
  }

  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 28px;
  animation: ${fadeInUp} 0.4s ease 0.1s both;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
  }

  p {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Cart Items ────────────────────────────────────────────
export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CartCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.1);
  }
`;

export const FoodImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  background: #334155;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FoodInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }

  .category {
    font-size: 12px;
    color: #64748b;
  }

  .price {
    font-size: 15px;
    font-weight: 600;
    color: #f97316;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 500;
  background: ${({ $type }) =>
    $type === "success" ? "rgba(34,197,94,0.12)" : "rgba(249,115,22,0.12)"};
  color: ${({ $type }) => ($type === "success" ? "#22C55E" : "#F97316")};
`;

export const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const QtyBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 0.5px solid #334155;
  background: #0f172a;
  color: #f8fafc;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s,
    color 0.2s;

  &:hover {
    border-color: #f97316;
    color: #f97316;
  }
`;

export const QtyNum = styled.span`
  font-size: 14px;
  font-weight: 500;
  min-width: 20px;
  text-align: center;
  color: #f8fafc;
`;

export const DeleteBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 0.5px solid #ef4444;
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  transition: background 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.18);
  }
`;

// ─── Order Panel ───────────────────────────────────────────
export const OrderPanel = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 22px;
  position: sticky;
  top: 24px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 18px;
  }
`;

export const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #94a3b8;
  padding: 8px 0;
  border-bottom: 0.5px solid #334155;

  &:last-of-type {
    border-bottom: none;
  }

  span:last-child {
    color: #f8fafc;
    font-weight: 500;
  }
`;

export const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0 18px;

  span:first-child {
    font-size: 14px;
    color: #94a3b8;
  }
  span:last-child {
    font-size: 20px;
    font-weight: 500;
    color: #f97316;
  }
`;

export const OrderBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: #f97316;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition:
    background 0.2s,
    transform 0.15s;

  &:hover {
    background: #ea6c0a;
  }
  &:active {
    transform: scale(0.98);
  }
`;

// ─── Empty State ───────────────────────────────────────────
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  animation: ${fadeInUp} 0.4s ease;

  img {
    width: 380px;
    object-fit: cover;
    margin-right: 24px;
    opacity: 0.7;
    margin-top: 0px;
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    color: black;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 20px;
  }
`;

export const NavBtn = styled.button`
  padding: 12px 28px;
  background: #f97316;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: background 0.2s;

  &:hover {
    background: #ea6c0a;
  }
`;
