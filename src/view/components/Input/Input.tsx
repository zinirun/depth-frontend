import { forwardRef, InputHTMLAttributes, useRef } from "react";
import { composeRef } from "../_util/ref";
import styled from "styled-components";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  debounce?: number;
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { onChange, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  const preventPropagation = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <StyledInput
      {...rest}
      ref={composeRef(ref, inputRef)}
      onChange={handleChange}
      onClick={preventPropagation}
    />
  );
});

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 6px 4px 6px 2px;
  width: 100%;
  color: #333;
  background: transparent;
`;

export default Input;
