import ClassName from "configs/styles/class-names";
import { SystemColor } from "configs/styles/colors";
import { Size } from "configs/styles/size";
import styled from "styled-components";
import { WorkspaceProjectListContainer } from "view/containers/WorkspaceProjectListContainer";
import { WorkspaceTaskTreeContainer } from "view/containers/WorkspaceTaskTreeContainer";
import { Header } from "../../components/Header";
import FullScreen from "../../components/Layout/FullScreen";

interface IWorkspacePageProps {
  operation: "task-tree" | "project-list";
}

export default function WorkspacePage({ operation }: IWorkspacePageProps) {
  return (
    <FullScreen>
      <Header />
      <TransparentRewardSection id="reward-target" />
      <ContentContainer className={ClassName.Workspace.ContentContainer}>
        {operation === "task-tree" && <WorkspaceTaskTreeContainer />}
        {operation === "project-list" && <WorkspaceProjectListContainer />}
      </ContentContainer>
    </FullScreen>
  );
}

const ContentContainer = styled.div`
  margin-top: ${Size.HeaderHeight}px;
  height: 100%;
  background-color: ${SystemColor.Grey10};
  overflow: auto;
`;

const TransparentRewardSection = styled.div`
  width: 0px;
  height: 0px;
  background-color: red;
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
`;
