import { useRecoilState } from "recoil";
import { HeaderState } from "recoil/atoms";

export default function useHeader() {
  const [header, setHeader] = useRecoilState(HeaderState);

  return {
    header,
    setHeader,
  };
}
