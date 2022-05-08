import { useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ME } from "../../api/queries/me";
import { IUser } from "../../configs/interfaces/common/user.interface";
import { UserPendingState, UserState } from "../../recoil/atoms";

interface ILoginValidatorProps {
  children: React.ReactNode;
}

export function LoginValidator({ children }: ILoginValidatorProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useSetRecoilState(UserState);
  const { data, error } = useQuery<{ me: IUser }>(ME);
  const setUserPending = useSetRecoilState(UserPendingState);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setUser(data.me);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (error) {
      const exception = error.graphQLErrors[0]?.extensions?.exception as any;
      if (exception?.status === 406) {
        // User.inviteStatus is pending
        const { response: user } = exception;
        user && setUserPending(user);
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return <>{loading ? <></> : children}</>;
}
