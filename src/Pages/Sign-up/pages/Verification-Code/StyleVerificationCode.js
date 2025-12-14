import styled from 'styled-components';

export const StyleVerificationCode = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0ff, #e0d4f7);
  font-family: sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    border-radius: 12px;
    width: 330px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  .container-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container-nav p {
    margin-top: 12px;
    font-size: 14px;
  }

  #timer {
    margin-top: 10px;
  }
  .resultContainer {
    margin-top: 35px;
  }
  .resultContainer button {
    width: 100%;
  }
  .resultContainer p {
    margin-top: 10px;
    font-size: 14px;
  }
`;
