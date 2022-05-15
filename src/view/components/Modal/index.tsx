import { SystemColor } from "configs/styles/colors";
import styled from "styled-components";
import RowFlexSection from "../Layout/RowFlexSection";
import Line from "../Line";
import Typo from "../Typo/Typo";
import getSizeByProp from "../_util/getSizeByProp";
import useModal from "util/hooks/useModal";
import CloseIconButton from "../Button/IconButton/CloseIconButton";

export interface IModalProps {
  title?: string;
  visible?: boolean;
  content?: React.ReactNode;
  maxWidth?: string | number;
  width?: string | number;
}

export default function Modal() {
  const { modal, setModal } = useModal();
  const { visible, title, content, maxWidth = 350, width } = modal;
  const handleClose = () => {
    setModal({
      visible: false,
    });
  };
  return (
    <ModalContainer visible={visible} maxWidth={maxWidth} width={width}>
      <RowFlexSection justifyContent="space-between" padding="18px">
        <Typo>{title}</Typo>
        <CloseIconButton onClick={handleClose} />
      </RowFlexSection>
      <Line />
      <ModalContentContainer>{content}</ModalContentContainer>
    </ModalContainer>
  );
}

const ModalContainer = styled.div<{
  visible?: boolean;
  maxWidth?: string | number;
  width?: string | number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  overflow: hidden;
  display: ${(props) => (props.visible ? "flex" : "none")};
  background: white;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid ${SystemColor.Grey20};
  max-width: ${(props) =>
    `min(90%, ${getSizeByProp(props.maxWidth, "350px")})`};
  width: ${(props) => getSizeByProp(props.width, "100%")};
  z-index: 99;
  box-shadow: 0px 4px 8px rgba(57, 58, 64, 0.16);
`;

const ModalContentContainer = styled.div`
  padding: 12px 24px 24px;
`;
