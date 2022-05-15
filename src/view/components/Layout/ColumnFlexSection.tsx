import styled from "styled-components";

const ColumnFlexSection = styled.div<{
  width?: number | string;
  gap?: number;
  align?: string;
  justify?: string;
}>`
  display: flex;
  width: ${(props) =>
    props.width
      ? typeof props.width === "number"
        ? `${props.width}px`
        : props.width
      : "100%"};
  flex-direction: column;
  gap: ${(props) => `${props.gap}px` || "5px"};
  ${(props) => props.justify && `justify-content: ${props.align};`}
  ${(props) => props.align && `align-items: ${props.align};`}
`;

export default ColumnFlexSection;
