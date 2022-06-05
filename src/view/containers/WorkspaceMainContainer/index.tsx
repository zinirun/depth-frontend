import PrimaryContentSection from "view/components/Layout/PrimaryContentSection";
import { useEffect } from "react";
import useHeader from "util/hooks/useHeader";
import { Tabs } from "antd";
import ProjectsContainer from "./Tabs/ProjectsContainer";
import MyTasksContainer from "./Tabs/MyTasksContainer";
import styled from "styled-components";
import { SystemColor } from "configs/styles/colors";
import { useRecoilState } from "recoil";
import { WorkspaceMainTabKeyState } from "recoil/atoms";

export function WorkspaceMainContainer() {
  const { initialize, setOperation } = useHeader();
  useEffect(() => {
    initialize();
    setOperation("main");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [tabKey, setTabKey] = useRecoilState(WorkspaceMainTabKeyState);
  const handleChangeTabKey = (key: string) => {
    setTabKey(key);
  };

  return (
    <PrimaryContentSection padding="12px 24px">
      <TabsContainer>
        <Tabs activeKey={tabKey} onChange={handleChangeTabKey} size="small">
          <Tabs.TabPane tab="Projects" key="projects">
            <ProjectsContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="My Tasks" key="my-tasks">
            <MyTasksContainer />
          </Tabs.TabPane>
        </Tabs>
      </TabsContainer>
    </PrimaryContentSection>
  );
}

export const TabsContainer = styled.div`
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0 0 24px 0;
  }
  .ant-tabs-nav {
    border: none;
  }
  .ant-tabs-small > .ant-tabs-nav .ant-tabs-tab {
    padding: 4px 0;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 16px;
  }
  .ant-tabs-tab-btn {
    color: ${SystemColor.Text};
  }
  .ant-tabs-top > .ant-tabs-nav::before {
    border: none;
  }
`;
