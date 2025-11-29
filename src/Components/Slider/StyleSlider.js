import styled from 'styled-components';

export const StyleSlider = styled.div`
  .slider {
    width: 100%;
    max-width: 100%;
    height: 450px;
    margin: 1rem auto;
    border-radius: 20px;
    overflow: hidden;
    background: #f3f4f6;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    position: relative;
  }

  .slides {
    height: 100%;
    position: relative;
  }

  .slide {
    position: absolute;
    background-color: #f3f4f6;
    inset: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transition: opacity 0.6s ease, transform 0.6s ease;
    transform: scale(1);
  }

  .slide.active {
    opacity: 1;
    transform: scale(1);
  }

  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.85);
    border: none;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    z-index: 10;
  }

  .nav:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  .prev {
    left: 12px;
  }
  .next {
    right: 12px;
  }

  .dots {
    position: absolute;
    bottom: 12px;
    width: 100%;
    text-align: center;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    display: inline-block;
    margin: 0 5px;
    transition: 0.3s;
    cursor: pointer;
  }

  .dot.active {
    width: 16px;
    border-radius: 12px;
    background: #20c997;
  }

  @media (max-width: 600px) {
    .slider {
      height: 170px;
      border-radius: 15px;
    }
  }
`;
