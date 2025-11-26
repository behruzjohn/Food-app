import styled from 'styled-components';
import { FormControl } from '@mui/material';

export const StyledSelectWrapper = styled(FormControl)`
  margin-top: 20px;
  width: 120px;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 16px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    margin-top: 10px;
  }

  @media (min-width: 1025px) {
    margin-top: 4px;
  }
`;
