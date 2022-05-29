import ColumnFlexSection from "../../components/Layout/ColumnFlexSection";
import FullScreen from "../../components/Layout/FullScreen";
import { ReactComponent as Logo } from "assets/logo/BlackStrokeLogo.svg";
import Typo from "view/components/Typo/Typo";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IErrorPageState {
  message?: string;
}

export default function ErrorPage() {
  const { state } = useLocation();
  const { message } = state as IErrorPageState;
  const navigate = useNavigate();
  return (
    <FullScreen alignItems="center" justifyContent="center">
      <ColumnFlexSection gap={32} align="center">
        <ColumnFlexSection align="center" gap={8}>
          <Logo width={40} height={40} />
        </ColumnFlexSection>
        <ColumnFlexSection width={320} align="center" gap={18}>
          <Typo>Sorry, something goes wrong</Typo>
          {message && <Message>{message}</Message>}
          <Button onClick={() => navigate("/workspace")} block>
            Go back to Workspace
          </Button>
        </ColumnFlexSection>
      </ColumnFlexSection>
    </FullScreen>
  );
}

const Message = styled.p`
  color: #777;
`;
