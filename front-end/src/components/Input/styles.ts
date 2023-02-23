import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;

  background: ${({ theme }) => theme.colors?.background};
  color: ${({ theme }) => theme.colors?.text};
  border: 2px solid  ${({ theme }) => theme.colors?.text};


  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) => props.isFocused && css`
    color: #232119 ;
    border-color: #232119;
  `}

  ${(props) => props.isFilled && css`
    color: #232119 ;
  `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
  }

  svg {
    margin-right: 16px;
  }

`;

