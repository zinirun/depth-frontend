import "./App.less";
import { ApolloProvider } from "@apollo/react-hooks";
import { useRecoilValue } from "recoil";
import { client } from "./configs/apollo/client";
import { GlobalStyle } from "./configs/styles/global-style";
import { UserState } from "./recoil/atoms";
import { AfterLoginRoutes, BeforeLoginRoutes } from "./Routes";
import { LoginValidator } from "./util/hoc/LoginValidator";

function App() {
  const user = useRecoilValue(UserState);
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <LoginValidator>
        {user ? <AfterLoginRoutes /> : <BeforeLoginRoutes />}
      </LoginValidator>
    </ApolloProvider>
  );
}

export default App;
