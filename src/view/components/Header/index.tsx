import styled from "styled-components";
import { TransparentButton } from "../Button";
import RowFlexSection from "../Layout/RowFlexSection";
import { StrokeLogo } from "../Logo";
import { ReactComponent as ExpandIcon } from "assets/common/ExpandWhiteIcon.svg";
import { Size } from "configs/styles/size";

export interface IHeaderOption {
  projectId?: string;
  projectTitle?: string;
}

export function Header() {
  return (
    <NavSection>
      <RowFlexSection>
        <TransparentButton
          icon={<ExpandIcon />}
          hoverBackground="#111"
          height={Size.HeaderHeight}
          padding="0 4px 0 8px"
        >
          <StrokeLogo />
        </TransparentButton>
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
`;
