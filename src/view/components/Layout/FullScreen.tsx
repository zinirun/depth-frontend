import styled from "styled-components";

const FullScreen = styled.div<{
  alignItems?: string;
  justifyContent?: string;
  overflow?: string;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${(props) => props.overflow && `overflow: ${props.overflow};`}
`;

export default FullScreen;
