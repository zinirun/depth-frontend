import Button from "../../components/Button";
import ColumnFlexSection from "../../components/Layout/ColumnFlexSection";
import FullScreen from "../../components/Layout/FullScreen";
import Typo from "view/components/Typo/Typo";
import moment from "moment";
import { Form, Input } from "antd";
import { SystemColor } from "configs/styles/colors";
import { useMutation } from "@apollo/react-hooks";
import { ASSIGN_INVITE_WITH_OAUTH } from "api/mutations/assign-invite";
import { IUser } from "configs/interfaces/common/user.interface";
import errorLogger from "util/logger/error-logger";
import useUser from "util/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AssignPage() {
  const { setUser, logout, userPending: user, setUserPending } = useUser();
  const navigate = useNavigate();
  const [assignInviteWithOAuth] = useMutation<
    { assignInviteWithOAuth: IUser },
    { id: string; name?: string }
  >(ASSIGN_INVITE_WITH_OAUTH);
  const handleAssign = async ({ name }: { name: string }) => {
    if (!user) {
      return;
    }
    try {
      const { data } = await assignInviteWithOAuth({
        variables: { id: user.id, name },
      });
      if (data?.assignInviteWithOAuth) {
        setUser(data.assignInviteWithOAuth);
        setUserPending(undefined);
      } else {
        errorLogger(new Error("Assigned invite but nothing returned"));
      }
    } catch (err) {
      errorLogger(err as Error);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <FullScreen alignItems="center" justifyContent="center">
      {user && (
        <ColumnFlexSection gap={32} align="center">
          <ColumnFlexSection align="center" gap={20}>
            <Typo fontSize="2.5rem" bold>
              Hello, {user.name || user.email}!
            </Typo>
          </ColumnFlexSection>
          <Form onFinish={handleAssign}>
            <ColumnFlexSection width={320} gap={12}>
              <Typo color={SystemColor.Grey50} fontSize="0.9rem">
                Your display name
              </Typo>
              <Form.Item name="name" noStyle>
                <Input placeholder={user.name} size="large" />
              </Form.Item>
              <ColumnFlexSection align="center" gap={48}>
                <Button type="submit" block>
                  Join {user.companyName}
                </Button>
                <ColumnFlexSection align="center" gap={8}>
                  <Typo fontSize="0.7rem" color="#aaa" onClick={logout}>
                    Use another account
                  </Typo>
                  <Typo fontSize="0.7rem" color="#aaa">
                    © {moment().format("YYYY")} Depth Labs
                  </Typo>
                </ColumnFlexSection>
              </ColumnFlexSection>
            </ColumnFlexSection>
          </Form>
        </ColumnFlexSection>
      )}
    </FullScreen>
  );
}