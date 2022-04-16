import styled from "styled-components";

const RowFlexSection = styled.div<{
  width?: number | string;
  gap?: number;
  reverse?: boolean;
  alignItems?: string;
  justifyContent?: string;
  padding?: string;
  margin?: string;
}>`
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  gap: ${(props) => (props.gap ? `${props.gap}px` : "5px")};
  ${(props) =>
    props.width &&
    (typeof props.width === "number"
      ? `width: ${props.width}px;`
      : `width: ${props.width};`)}
  ${(props) => props.padding && `padding: ${props.padding};`}
  ${(props) => props.margin && `margin: ${props.margin};`}
`;

export default RowFlexSection;
