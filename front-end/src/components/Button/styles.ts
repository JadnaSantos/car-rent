import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`

  background: ${({ theme }) => theme.colors?.button};
  color: ${({ theme }) => theme.colors?.black};
  border-radius: 10px;
  border: 0;
  font-weight: 500;

  padding: 0 16px;
  width: 100%;
  height: 56px;

  margin-top: 16px;
  transition: background-color 0.2s;

  a {
    color: ${({ theme }) => theme.colors?.white};

  }

  @keyframes animate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


`;

