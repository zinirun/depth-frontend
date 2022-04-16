import styled from "styled-components";

const FullScreen = styled.div<{ alignItems?: string; justifyContent?: string }>`
  width: 100%;
  height: ${window.innerHeight}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
`;

export default FullScreen;
