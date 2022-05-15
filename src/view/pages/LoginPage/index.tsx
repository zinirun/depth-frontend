import Button from "../../components/Button";
import ColumnFlexSection from "../../components/Layout/ColumnFlexSection";
import FullScreen from "../../components/Layout/FullScreen";
import { ReactComponent as Logo } from "assets/logo/BlackStrokeLogo.svg";
import { ReactComponent as WorkWithDepthLogo } from "assets/logo/WorkWithDepthLogo.svg";
import Typo from "view/components/Typo/Typo";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUser from "util/hooks/useUser";
import { Alert, message } from "antd";

export default function LoginPage() {
  const [params] = useSearchParams();
  const userNotFoundEmail = params.get("notfound");
  const { userPending } = useUser();
  const navigate = useNavigate();
  const onClickGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  useEffect(() => {
    if (userPending) {
      navigate("/login/assign");
    }
  }, [userPending, navigate]);
  return (
    <FullScreen alignItems="center" justifyContent="center">
      <ColumnFlexSection gap={32} align="center">
        <ColumnFlexSection align="center" gap={8}>
          <Logo width={40} height={40} />
          <WorkWithDepthLogo width={280} height={70} />
        </ColumnFlexSection>
        <ColumnFlexSection width={320} align="center" gap={48}>
          <ColumnFlexSection align="center" gap={8}>
            {userNotFoundEmail && (
              <Alert
                message={
                  <Typo fontSize="0.8rem">
                    Sorry, There's no member found by {userNotFoundEmail}. Check
                    your email or ask to your company manager.
                  </Typo>
                }
                type="warning"
                closable
              />
            )}
            <Button onClick={onClickGoogleLogin} block>
              Login with Google
            </Button>
            <Button
              onClick={() => message.info("Sorry, we're preparing")}
              block
            >
              Login with Email
            </Button>
          </ColumnFlexSection>
          <ColumnFlexSection align="center">
            <Typo fontSize="0.7rem" color="#aaa">
              Private Opened
            </Typo>
            <Typo fontSize="0.7rem" color="#aaa">
              © {moment().format("YYYY")} Depth Labs
            </Typo>
          </ColumnFlexSection>
        </ColumnFlexSection>
      </ColumnFlexSection>
    </FullScreen>
  );
}
