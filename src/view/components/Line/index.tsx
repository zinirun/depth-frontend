import { SystemColor } from "configs/styles/colors";
import styled from "styled-components";

const Line = styled.div<{
  width?: string | number;
  space?: string | number;
  bold?: boolean;
  color?: string;
}>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.space || "0px"};
  border-top: ${(props) =>
    props.bold
      ? `2px solid ${SystemColor.Grey10}`
      : `1px solid ${SystemColor.Grey10}`};
  ${(props) => props.color && `border-color: ${props.color};`}
`;

export default Line;
