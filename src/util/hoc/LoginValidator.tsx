import { useQuery } from "@apollo/react-hooks";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ME } from "../../api/queries/me";
import { IUser } from "../../configs/interfaces/common/user.interface";
import { UserState } from "../../recoil/atoms";

interface ILoginValidatorProps {
  children: React.ReactNode;
}

export function LoginValidator({ children }: ILoginValidatorProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useSetRecoilState(UserState);
  const { data, error } = useQuery<{ me: IUser }>(ME);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setUser(data.me);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return <>{loading ? <></> : children}</>;
}
