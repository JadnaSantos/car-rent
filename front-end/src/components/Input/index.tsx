import { IconProps } from 'phosphor-react';
import * as S from './styles';
import React, { useState, useCallback, InputHTMLAttributes, useRef } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  type?: string;
  autocomplete?: string;
  icon?: React.ComponentType<IconProps>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, value, autocomplete, onChange, icon: Icon, ...rest }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }

  }, []);

  return (
    <S.Container
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input">
      {Icon && <Icon size={24} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={ref}
        {...rest}
        type={type}
        autoComplete={autocomplete}
        value={value}
        onChange={onChange}
      />
    </S.Container>
  );
});

