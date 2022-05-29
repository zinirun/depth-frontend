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
      onDragEnter={(e) => {
        console.log("drag capture");
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragEnd={(e) => {
        console.log("drag end");
      }}
    />
  );
});

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  color: #333;
  background: transparent;
`;

export default Input;
