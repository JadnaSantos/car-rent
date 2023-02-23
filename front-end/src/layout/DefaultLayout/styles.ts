import styled from 'styled-components';

export const LayoutContainer = styled.div`
  max-width: min(90rem, 90vw);
  margin-inline: auto;

  @media (max-width: 976px) {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 5rem;
  }
`;
