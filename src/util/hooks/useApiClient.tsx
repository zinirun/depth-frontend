import { ApolloClient } from "@apollo/react-hooks";
import { client } from "configs/apollo/client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserState } from "recoil/atoms";

export default function useApiClient() {
  const user = useRecoilValue(UserState);
  const [loadedWithToken, setLoadedWithToken] = useState<boolean>(false);
  const [apiClient, setApiClient] = useState<ApolloClient<any> | undefined>(
    undefined
  );
  useEffect(() => {
    if (user?._access) {
      if (!loadedWithToken) {
        setApiClient(client(user?._access));
        setLoadedWithToken(true);
      }
    } else {
      setApiClient(client());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._access]);

  return { client: apiClient };
}
