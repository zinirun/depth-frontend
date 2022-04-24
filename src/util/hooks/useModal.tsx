import { useRecoilState } from "recoil";
import { ModalState } from "recoil/atoms";

export default function useModal() {
  const [modal, setModal] = useRecoilState(ModalState);

  const close = () => {
    setModal({
      visible: false,
    });
  };

  return { modal, setModal, close };
}
