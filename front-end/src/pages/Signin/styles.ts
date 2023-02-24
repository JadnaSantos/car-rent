import styled, { keyframes } from 'styled-components';
import signInBackground from '../../assets/background.jpg';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;

  justify-content: center;

  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;


const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;


export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 0.7s;

  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;


    h4 {
      margin-bottom: 24px;
    }


    a {
      color: ${({ theme }) => theme.colors.black};
      margin-top: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#000')};
      }
    }
  }

  > a {
    color:  ${({ theme }) => theme.colors.black};
    display: flex;
    align-items: center;
    transition: color 0.2s;


    &:hover {
      color: ${shade(0.2, '#000')};
    }


    svg {
      margin-right: 8px;
    }
  }
`;


export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
