import styled from 'styled-components';

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

  img{
    width: 50%;
  }

  img {
    &:hover {
      cursor: pointer;
    }
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
`;

export const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;

export const HeaderItem = styled.div`
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    margin-right: 40px;

    @media (max-width: 768px) {
      margin-right: 0;
    }
  }

  &:hover {
    cursor: pointer;
  }

`;

