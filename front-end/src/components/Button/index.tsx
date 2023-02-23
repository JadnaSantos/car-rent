import React from 'react';
import { Spinner } from 'phosphor-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode
}

export const Button = ({ loading, children, ...rest }: ButtonProps) => {
  return (
    <Container type="button" {...rest}

    >
      {loading ? (
        <Spinner color='#fffff' size={16} />
      ) : (
        <a>
          {children}
        </a>
      )}
    </Container>
  );
};
