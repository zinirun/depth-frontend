import styled from "styled-components";

const GridSection = styled.div<{
  width?: number | string;
  gap?: number;
  template?: string;
  autoFillSize?: number;
  background?: string;
}>`
  display: grid;
  align-items: center;
  grid-gap: ${(props) => (props.gap ? `${props.gap}px` : "5px")};
  grid-template-columns: ${(props) =>
    props.template
      ? props.template
      : `repeat(auto-fill, minmax(${props.autoFillSize || 256}px, 1fr))`};
  width: ${(props) =>
    props.width
      ? typeof props.width === "number"
        ? `width: ${props.width}px;`
        : `width: ${props.width};`
      : "100%"};
  ${(props) => props.background && `background: ${props.background};`}
`;

export default GridSection;
