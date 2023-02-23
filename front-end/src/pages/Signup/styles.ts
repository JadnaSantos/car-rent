import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;

  justify-content: center;

  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  margin-top: 1rem;
  width: 600px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  padding: 2rem 1.5rem;

  img {
    width: 70%;
  }

  form {
    margin: 50px 0;
    width: 430px;

    text-align: center;

    h4 {
      margin-bottom: 24px;
      color: ${({ theme }) => theme.colors.text};
    }

    button {
      background: ${({ theme }) => theme.colors.button};
      color: ${({ theme }) => theme.colors.black};
      border-radius: 10px;
      border: 0;
      font-weight: 500;

      padding: 0 16px;
      width: 100%;
      height: 56px;

      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover{
        background: ${shade(0.2, '#8284FA')};
      }
    }

    > a {
      color: ${({ theme }) => theme.colors.text};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: background-color 0.2s;

      &:hover{
        color: ${shade(0.2, '#6C6C80')};
      }
    }
  }

  > a {
    color: ${({ theme }) => theme.colors.text};
    margin-top: 5px;
    text-decoration: none;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover{
      color: ${shade(0.2, '#6C6C80')};
    }
  }

  span {
    color: ${({ theme }) => theme.colors.error};
  }

  @media (max-width: 620px) {
    width: 90%;
  }

  @media (max-width: 425px) {
    padding: 0rem 1.5rem 0rem 6.5rem
  }

  @media (max-width: 320px) {
    padding: 0rem 0.5rem 0rem 9.5rem;
  }

`;


