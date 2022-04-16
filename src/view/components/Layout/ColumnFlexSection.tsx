import styled from "styled-components";

const ColumnFlexSection = styled.div<{ width?: number | string; gap?: number }>`
  display: flex;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  flex-direction: column;
  gap: ${(props) => `${props.gap}px` || "5px"};
`;

export default ColumnFlexSection;
