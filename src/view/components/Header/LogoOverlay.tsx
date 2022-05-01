import { Menu } from "antd";
import Typo from "../Typo/Typo";

interface ILogoOverlayProps {
  logout?: () => Promise<void>;
}

const LogoOverlay = ({ logout }: ILogoOverlayProps) => {
  return (
    <Menu
      items={
        [
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
