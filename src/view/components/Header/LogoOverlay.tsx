import { Menu } from "antd";
import Typo from "../Typo/Typo";

interface ILogoOverlayProps {
  logout?: () => Promise<void>;
  goHome?: () => void;
}

const LogoOverlay = ({ logout, goHome }: ILogoOverlayProps) => {
  return (
    <Menu
      items={
        [
          {
            label: (
              <Typo fontSize="0.8rem" onClick={goHome}>
                Home
              </Typo>
            ),
          },
          {
            label: (
              <Typo fontSize="0.8rem" onClick={logout}>
                Log out
              </Typo>
            ),
          },
        ] as any
      }
    />
  );
};

export default LogoOverlay;
