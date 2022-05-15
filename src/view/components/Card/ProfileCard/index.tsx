import { Tabs } from "antd";
import { useEffect } from "react";
import useModal from "util/hooks/useModal";
import CloseIconButton from "view/components/Button/IconButton/CloseIconButton";
import ColumnFlexSection from "view/components/Layout/ColumnFlexSection";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import Typo from "view/components/Typo/Typo";
import { TabsContainer } from "view/containers/WorkspaceMainContainer";
import CompanyContainer from "./Tabs/CompanyContainer";
import UserContainer from "./Tabs/UserContainer";

interface IProfileCardProps {
  onClose?: () => void;
}

export default function ProfileCard({ onClose }: IProfileCardProps) {
  const { close } = useModal();
  useEffect(() => {
    return () => close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ColumnFlexSection gap={16}>
      <RowFlexSection
        gap={2}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Typo fontSize="1.1rem">Profile</Typo>
        <CloseIconButton onClick={onClose} />
      </RowFlexSection>
      <TabsContainer>
        <Tabs defaultActiveKey="user" size="small">
          <Tabs.TabPane tab="Account" key="user">
            <UserContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Company" key="company">
            <CompanyContainer />
          </Tabs.TabPane>
        </Tabs>
      </TabsContainer>
    </ColumnFlexSection>
  );
}
