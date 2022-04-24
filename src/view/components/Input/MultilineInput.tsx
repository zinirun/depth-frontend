import { forwardRef, TextareaHTMLAttributes, useEffect, useRef } from "react";
import { composeRef } from "../_util/ref";
import styled from "styled-components";

export interface IMultilineInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  debounce?: number;
  fontSize?: string;
}

const MultilineInput = forwardRef<HTMLTextAreaElement, IMultilineInputProps>(
  (props, ref) => {
    const { onChange, ...rest } = props;
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange(e);
    };

    const resizeText = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      const textarea = inputRef.current;
      if (textarea) {
        textarea.style.height = "40px";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    };

    useEffect(() => {
      const textarea = inputRef.current;
      if (textarea) {
        textarea.style.height = "40px";
        if (textarea.scrollHeight) {
          textarea.style.height = textarea.scrollHeight + "px";
        }
      }
    }, []);

    return (
      <StyledInput
        {...rest}
        ref={composeRef(ref, inputRef)}
        onChange={handleChange}
        onKeyUp={resizeText}
        onKeyDown={resizeText}
      />
    );
  }
);

const StyledInput = styled.textarea<{ fontSize?: string }>`
  border: none;
  outline: none;
  padding: 6px 4px 6px 2px;
  width: 100%;
  color: #333;
  font-size: ${(props) => props.fontSize || "1rem"};
  height: 40px;
  resize: none;
  background: transparent;
`;

export default MultilineInput;
