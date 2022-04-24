import { useRecoilState } from "recoil";
import { UserState } from "recoil/atoms";

export default function useUser() {
  const [user, setUser] = useRecoilState(UserState);
  return { user, setUser };
}
