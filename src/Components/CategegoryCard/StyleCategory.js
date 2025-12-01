import styled from 'styled-components';

export const StyleCategoryCardS = styled.div`
  width: 270px;
  height: 150px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-color: #000;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-5px) scale(1.01);
  }

  .card__content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.65),
      rgba(0, 0, 0, 0.1)
    );
    z-index: 1;
  }

  #title-box {
    position: absolute;
    bottom: 12px;
    left: 12px;
    z-index: 2;
    color: white;
  }

  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 0 3px 10px rgba(0, 0, 0, 0.7);
  }

  svg {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;
    color: white;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 50%;
    padding: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  svg:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;
