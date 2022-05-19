import { useQuery } from "@apollo/react-hooks";
import { SET_TOKEN } from "api/queries/setToken";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import errorLogger from "util/logger/error-logger";

export default function SetTokenPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const { data, error } = useQuery<{ setToken: boolean }, { token: string }>(
    SET_TOKEN,
    {
      variables: { token: token as string },
      skip: !token?.length,
    }
  );

  useEffect(() => {
    if (data) {
      if (data.setToken) {
        navigate("/workspace");
      } else {
        navigate("/login");
      }
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      errorLogger(error);
      navigate("/login");
    }
  }, [error, navigate]);

  return <></>;
}
