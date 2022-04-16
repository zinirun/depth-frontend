import Button from "../../components/Button";
import ColumnFlexSection from "../../components/Layout/ColumnFlexSection";
import FullScreen from "../../components/Layout/FullScreen";
import Title from "../../components/Typo/Title";

export default function LoginPage() {
  const onClickGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <FullScreen alignItems="center" justifyContent="center">
      <Title bold>Hello</Title>
      <ColumnFlexSection width={320}>
        <Button onClick={onClickGoogleLogin} block>
          Login with Google
        </Button>
      </ColumnFlexSection>
    </FullScreen>
  );
}
