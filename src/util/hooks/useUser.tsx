import { useLazyQuery } from "@apollo/react-hooks";
import { LOGOUT } from "api/queries/logout";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserPendingState, UserState } from "recoil/atoms";

export default function useUser() {
  const [userPending, setUserPending] = useRecoilState(UserPendingState);
  const [user, setUser] = useRecoilState(UserState);
  const [execLogout] = useLazyQuery<{ logout: string }>(LOGOUT);
  const navigate = useNavigate();
  const logout = async () => {
    await execLogout();
    setUser(undefined);
    setUserPending(undefined);
    navigate("/login");
  };
  return { user, setUser, userPending, setUserPending, logout };
}
