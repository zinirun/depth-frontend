import { useLazyQuery } from "@apollo/react-hooks";
import { LOGOUT } from "api/queries/logout";
import { useRecoilState } from "recoil";
import { UserState } from "recoil/atoms";

export default function useUser() {
  const [user, setUser] = useRecoilState(UserState);
  const [execLogout] = useLazyQuery<{ logout: string }>(LOGOUT);
  const logout = async () => {
    await execLogout();
    setUser(null);
  };
  return { user, setUser, logout };
}
