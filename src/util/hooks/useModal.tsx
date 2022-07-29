import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ModalState } from "recoil/atoms";

export default function useModal() {
  const [modal, setModal] = useRecoilState(ModalState);
  const { pathname } = useLocation();

  const close = () => {
    setModal({
      visible: false,
    });
  };

  useEffect(() => {
    return () => {
      close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return { modal, setModal, close };
}
