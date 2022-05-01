import Button from "../../components/Button";
import ColumnFlexSection from "../../components/Layout/ColumnFlexSection";
import FullScreen from "../../components/Layout/FullScreen";
import Title from "../../components/Typo/Title";
import { ReactComponent as Logo } from "assets/logo/BlackStrokeLogo.svg";
import RowFlexSection from "view/components/Layout/RowFlexSection";

export default function LoginPage() {
  const onClickGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <FullScreen alignItems="center" justifyContent="center">
      <RowFlexSection alignItems="center" gap={20}>
        <Logo width={40} />
        <Title bold>Work with Depth</Title>
      </RowFlexSection>
      <ColumnFlexSection width={320}>
        <Button onClick={onClickGoogleLogin} block>
          Login with Google
        </Button>
      </ColumnFlexSection>
    </FullScreen>
  );
}
