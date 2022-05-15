import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { IUpdateUserInput, UPDATE_ME } from "api/mutations/update-me";
import { LOGOUT } from "api/queries/logout";
import { ME } from "api/queries/me";
import { IUser } from "configs/interfaces/common/user.interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserPendingState, UserState } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";

export default function useUser() {
  const [userPending, setUserPending] = useRecoilState(UserPendingState);
  const [user, setUser] = useRecoilState(UserState);
  const [execLogout] = useLazyQuery<{ logout: string }>(LOGOUT);
  const [refetch, { data }] = useLazyQuery<{ me: IUser }>(ME);
  const [updateUser] = useMutation<
    { updateMe: IUser },
    { input: IUpdateUserInput }
  >(UPDATE_ME);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const logout = async () => {
    await execLogout();
    setUser(undefined);
    setUserPending(undefined);
    navigate("/login");
  };

  const update = async (input: Omit<IUpdateUserInput, "id">) => {
    if (!user) {
      return;
    }
    try {
      const { data } = await updateUser({
        variables: {
          input: {
            ...input,
            id: user._id,
          },
        },
      });
      return data?.updateMe;
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  return {
    user,
    setUser,
    userPending,
    setUserPending,
    logout,
    update,
    refetch,
  };
}
