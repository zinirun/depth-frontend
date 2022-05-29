import styled from "styled-components";
import { ReactComponent as CloseIcon } from "assets/common/CloseBlackIcon.svg";

export default function CloseIconButton({
  onClick,
  size = "medium",
}: {
  onClick?: () => any;
  size?: "small" | "medium";
}) {
  return (
    <ModalCloseButton onClick={onClick} size={size}>
      <CloseIcon />
    </ModalCloseButton>
  );
}
const ModalCloseButton = styled.span<{ size?: "medium" | "small" }>`
  cursor: pointer;
  ${(props) =>
    props.size === "small" &&
    `
    svg {
      width: 20px;
      height: 20px;
    }
  `}
  svg > path {
    transition: 0.4s all;
    stroke: #999;
  }
  :hover svg > path {
    stroke: #333;
  }
`;
