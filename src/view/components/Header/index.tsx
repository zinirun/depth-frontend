import styled from "styled-components";
import { TransparentButton } from "../Button";
import RowFlexSection from "../Layout/RowFlexSection";
import { StrokeLogo } from "../Logo";
import { ReactComponent as ExpandIcon } from "assets/common/ExpandWhiteIcon.svg";
import { Size } from "configs/styles/size";
import { IProject } from "configs/interfaces/common/project.interface";
import useHeader from "util/hooks/useHeader";
import Typo from "../Typo/Typo";
import { SystemColor } from "configs/styles/colors";

export interface IHeaderOption {
  operation?: "project";
  projectId?: string;
  project?: IProject;
}

export function Header() {
  const { header } = useHeader();
  return (
    <NavSection>
      <RowFlexSection gap={0}>
        <TransparentButton
          icon={<ExpandIcon />}
          hoverBackground="#111"
          height={Size.HeaderHeight}
          padding="0 4px 0 8px"
        >
          <StrokeLogo />
        </TransparentButton>
        {header.operation === "project" && (
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
        )}
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
