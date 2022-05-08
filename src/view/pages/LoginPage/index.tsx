import Button from "../../components/Button";
import ColumnFlexSection from "../../components/Layout/ColumnFlexSection";
import FullScreen from "../../components/Layout/FullScreen";
import Title from "../../components/Typo/Title";
import { ReactComponent as Logo } from "assets/logo/BlackStrokeLogo.svg";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import Typo from "view/components/Typo/Typo";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "util/hooks/useUser";

export default function LoginPage() {
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
        <RowFlexSection alignItems="center" gap={20}>
          <Logo width={40} height={40} />
          <Title bold>Work with Depth</Title>
        </RowFlexSection>
        <ColumnFlexSection width={320} align="center" gap={48}>
          <ColumnFlexSection align="center" gap={8}>
            <Button onClick={onClickGoogleLogin} block>
              Login with Google
            </Button>
            <Button block>Login with Email</Button>
          </ColumnFlexSection>
          <Typo fontSize="0.7rem" color="#aaa">
            © {moment().format("YYYY")} Depth Labs
          </Typo>
        </ColumnFlexSection>
      </ColumnFlexSection>
    </FullScreen>
  );
}
