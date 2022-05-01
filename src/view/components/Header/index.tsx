import styled from "styled-components";
import { TransparentButton } from "../Button";
import RowFlexSection from "../Layout/RowFlexSection";
import { StrokeLogo } from "../Logo";
import { ReactComponent as ExpandIcon } from "assets/common/ExpandWhiteIcon.svg";
import { ReactComponent as InfoIcon } from "assets/common/InfoIcon.svg";
import { Size } from "configs/styles/size";
import { IProject } from "configs/interfaces/common/project.interface";
import useHeader from "util/hooks/useHeader";
import Typo from "../Typo/Typo";
import { SystemColor } from "configs/styles/colors";
import IconButton from "../Button/IconButton";
import { Dropdown, Popover } from "antd";
import ShortcutGuide from "./ShortcutGuide";
import ProjectOverlay from "./ProjectOverlay";
import LogoOverlay from "./LogoOverlay";
import useUser from "util/hooks/useUser";

export interface IHeaderOption {
  operation?: "project";
  projectId?: string;
  project?: IProject;
}

export function Header() {
  const { header } = useHeader();
  const { logout } = useUser();
  return (
    <NavSection>
      <RowFlexSection gap={0}>
        <Dropdown overlay={() => LogoOverlay({ logout })} trigger={["click"]}>
          <TransparentButton
            icon={<ExpandIcon />}
            hoverBackground="#111"
            height={Size.HeaderHeight}
            padding="0 4px 0 8px"
          >
            <StrokeLogo />
          </TransparentButton>
        </Dropdown>
        {header.operation === "project" && (
          <Dropdown overlay={ProjectOverlay} trigger={["click"]}>
            <TransparentButton
              icon={<ExpandIcon />}
              hoverBackground="#111"
              height={Size.HeaderHeight}
              padding="0 4px 0 8px"
            >
              <Typo color={SystemColor.Grey10} fontSize="0.85rem">
                {header.project?.title || "Untitled Project"}
              </Typo>
            </TransparentButton>
          </Dropdown>
        )}
      </RowFlexSection>
      <RowFlexSection>
        <Popover
          title={
            <RowFlexSection justifyContent="space-between" padding="6px 0 4px">
              <Typo fontSize="0.85rem">Shortcuts</Typo>
            </RowFlexSection>
          }
          content={ShortcutGuide}
          trigger="click"
          placement="bottomRight"
        >
          <IconButton>
            <InfoIcon width={22} />
          </IconButton>
        </Popover>
      </RowFlexSection>
    </NavSection>
  );
}

const NavSection = styled.nav`
  display: flex;
  width: 100%;
  height: ${Size.HeaderHeight}px;
  background-color: #404040;
  user-select: none;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 0;
  position: fixed;
  z-index: 9;
`;
