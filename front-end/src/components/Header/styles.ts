import styled from 'styled-components';

interface Click {
  readonly click: boolean;
}


export const Container = styled.header`
  padding: 1rem 0;
  position: sticky;
  top: 0;
  width: 100%;

  background-color: ${({ theme }) => theme.colors?.background};
  border-bottom: 1px solid hsla(0, 0%, 98%, 0.1);
  z-index: 999;

  justify-content: space-between;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }


`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.75rem;
  img {
    width: 10%;
  }

  @media (max-width: 769px) {
    img {
      width: 20%;
    }
  }

  @media (max-width: 425px) {
    img {
      width: 100%;
    }
  }

  @media (max-width: 998px) {
    img {
      display: none;
    }
  }
`;


export const MobileIcon = styled.div`
  display: none;


  @media (max-width: 994px) {
    display: block;
    position: absolute;
    top: 3.2rem;
    right: 1rem;
    cursor: pointer;
  }
`;

export const HeaderItem = styled.div<Click>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 994px) {
    height: 100vh;
    width: 83vw;
    background: ${({ theme }) => theme.colors?.background};
    z-index: 999;
    display: ${({ click }) => (click ? 'block' : 'none')};
    opacity: 0.95;
  }
`;

export const HeaderItems = styled.div`
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    margin-right: 40px;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-top: 4rem;
    width: 100%;
    justify-content: space-evenly;
    gap: 13rem;
  }
`;

export const AcessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  button {
    padding: 1rem 2rem 1rem;
    margin-top: 0rem;
  }

  @media (max-width: 768px) {
    display: grid;

    gap: 2rem;

    margin-top: 4rem;
  }
`;
