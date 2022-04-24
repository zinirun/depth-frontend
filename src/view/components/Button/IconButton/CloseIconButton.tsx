import styled from "styled-components";
import { ReactComponent as CloseIcon } from "assets/common/CloseBlackIcon.svg";

export default function CloseIconButton({ onClick }: { onClick?: () => any }) {
  return (
    <ModalCloseButton onClick={onClick}>
      <CloseIcon />
    </ModalCloseButton>
  );
}
const ModalCloseButton = styled.span`
  cursor: pointer;
  svg > path {
    transition: 0.4s all;
    stroke: #999;
  }
  :hover svg > path {
    stroke: #333;
  }
`;
