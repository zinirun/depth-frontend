import styled from "styled-components";
import { TransparentButton } from "../Button";
import RowFlexSection from "../Layout/RowFlexSection";
import { StrokeLogo } from "../Logo";
import { ReactComponent as ExpandIcon } from "assets/common/ExpandWhiteIcon.svg";
import { ReactComponent as InfoIcon } from "assets/common/InfoIcon.svg";
import { ReactComponent as CustomizeIcon } from "assets/common/PenIcon.svg";
import { Size } from "configs/styles/size";
import { IProject } from "configs/interfaces/common/project.interface";
import useHeader from "util/hooks/useHeader";
import Typo from "../Typo/Typo";
import { SystemColor } from "configs/styles/colors";
import IconButton from "../Button/IconButton";
import {
  Drawer,
  Dropdown,
  Popover,
  Radio,
  RadioChangeEvent,
  Switch,
} from "antd";
import ShortcutGuide from "./ShortcutGuide";
import ProjectOverlay from "./ProjectOverlay";
import LogoOverlay from "./LogoOverlay";
import useUser from "util/hooks/useUser";
import { ProfileBadge, ProfileBadges } from "../Badge/ProfileBadge";
import useModal from "util/hooks/useModal";
import UpdateProjectModalContent from "./UpdateProjectModalContent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileCard from "../Card/ProfileCard";
import useCustomized from "util/hooks/useCustomized";
import Line from "../Line";

export type HeaderOperation = "main" | "project";
export interface IHeaderOption {
  operation?: HeaderOperation;
  projectId?: string;
  project?: IProject;
}

export function Header() {
  const [profileDrawerVisible, setProfileDrawerVisible] =
    useState<boolean>(false);
  const { header } = useHeader();
  const { logout, user } = useUser();
  const { setModal } = useModal();
  const [showCustomizeSection, setShowCustomizeSection] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { layout, setLayout, hideDone, setHideDone } = useCustomized(
    header.projectId
  );

  useEffect(() => {
    setShowCustomizeSection(false);
  }, [header.projectId]);

  const openUpdateProjectModal = () => {
    if (header.projectId) {
      setModal({
        visible: true,
        title: "Edit Project",
        content: <UpdateProjectModalContent id={header.projectId} />,
      });
    }
  };

  const toggleShowCustomizeSection = () => {
    setShowCustomizeSection((prev) => !prev);
  };

  const handleChangeLayout = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  const handleChangeHideDone = (e: boolean) => {
    setHideDone(e);
  };

  return (
    <NavSection>
      {header.operation === "project" &&
        header.project &&
        showCustomizeSection && (
          <ProjectCustomizeSection>
            <RowFlexSection gap={6}>
              <Typo fontSize="0.8rem">Layout</Typo>
              <Radio.Group
                size="small"
                buttonStyle="solid"
                defaultValue={layout}
                onChange={handleChangeLayout}
              >
                <Radio.Button value="vertical">Vertical</Radio.Button>
                <Radio.Button value="horizontal">Horizontal</Radio.Button>
              </Radio.Group>
            </RowFlexSection>
            <Line />
            <RowFlexSection gap={6}>
              <Typo fontSize="0.8rem">Hide done</Typo>
              <Switch
                size="small"
                defaultChecked={hideDone}
                onChange={handleChangeHideDone}
              />
            </RowFlexSection>
          </ProjectCustomizeSection>
        )}
      <RowFlexSection gap={0}>
        <Dropdown
          overlay={() =>
            LogoOverlay({ logout, goHome: () => navigate("/workspace") })
          }
          trigger={["click"]}
        >
          <TransparentButton
            icon={<ExpandIcon />}
            hoverBackground="#111"
            height={Size.HeaderHeight}
            padding="0 4px 0 8px"
          >
            <StrokeLogo />
          </TransparentButton>
        </Dropdown>
        {/* {header.operation !== "main" && (
          <TransparentButton
            hoverBackground="#111"
            height={Size.HeaderHeight}
            padding="0 4px"
            onClick={() => navigate(-1)}
          >
            <BackIcon width={20} height={20} />
          </TransparentButton>
        )} */}
        {header.operation === "project" && header.project && (
          <Dropdown
            overlay={() =>
              ProjectOverlay({
                openUpdateProjectModal,
                showEdit: user?._id === header.project?.manager._id,
              })
            }
            trigger={["click"]}
          >
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
        {header.operation === "project" && header.project && (
          <TransparentButton
            hoverBackground="#111"
            height={Size.HeaderHeight}
            padding="0 4px"
            onClick={toggleShowCustomizeSection}
          >
            <CustomizeIcon width={20} height={20} />
          </TransparentButton>
        )}
      </RowFlexSection>
      <RowFlexSection gap={8}>
        {header.operation === "project" && header.project && (
          <ProfileBadges users={header.project.accesses} overflowCount={4} />
        )}
        {header.operation === "project" && (
          <Popover
            title={
              <RowFlexSection
                justifyContent="space-between"
                padding="6px 0 4px"
              >
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
        )}
        {header.operation === "main" && user && (
          <>
            <BadgeButton onClick={() => setProfileDrawerVisible(true)}>
              <ProfileBadge user={user} />
            </BadgeButton>
            <Drawer
              visible={profileDrawerVisible}
              onClose={() => setProfileDrawerVisible(false)}
              headerStyle={{
                display: "none",
              }}
              bodyStyle={{
                overflow: "hidden",
              }}
              width={440}
              mask={false}
            >
              <ProfileCard onClose={() => setProfileDrawerVisible(false)} />
            </Drawer>
          </>
        )}
      </RowFlexSection>
    </NavSection>
  );
}

const ProjectCustomizeSection = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 0 0 6px 6px;
  box-shadow: 0px 4px 8px rgba(57, 58, 64, 0.16);
  position: absolute;
  top: ${Size.HeaderHeight}px;
  left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: #333;
  .ant-radio-button-wrapper {
    span {
      font-size: 0.75rem;
    }
  }
`;

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

const BadgeButton = styled.span`
  cursor: pointer;
`;
