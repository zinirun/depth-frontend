import { SystemColor } from "configs/styles/colors";
import styled from "styled-components";

const PrimaryContentSection = styled.div<{
  backgroundColor?: string;
  padding?: string;
}>`
  height: 100%;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : SystemColor.Grey10};
  ${(props) => props.padding && `padding: ${props.padding};`}
`;

export default PrimaryContentSection;
