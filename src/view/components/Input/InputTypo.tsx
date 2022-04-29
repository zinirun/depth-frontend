import { forwardRef, InputHTMLAttributes, useEffect, useRef } from "react";
import { composeRef } from "../_util/ref";
import styled from "styled-components";
import getSizeByProp from "../_util/getSizeByProp";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  debounce?: number;
  color?: string;
  fontSize?: string | number;
}

const InputTypo = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { onChange, color, fontSize, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  const preventPropagation = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <StyledInput
      {...rest}
      ref={composeRef(ref, inputRef)}
      onChange={handleChange}
      onClick={preventPropagation}
      color={color}
      fontSize={fontSize}
    />
  );
});

const StyledInput = styled.input<{
  color?: string;
  fontSize?: string | number;
}>`
  border: none;
  outline: none;
  width: 100%;
  color: white;
  font-size: ${(props) => getSizeByProp(props.fontSize, "1rem")};
  background: transparent;
`;

export default InputTypo;
