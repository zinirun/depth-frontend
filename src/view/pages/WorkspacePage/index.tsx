import { useParams } from "react-router-dom";
import { WorkspaceProjectListContainer } from "view/containers/WorkspaceProjectListContainer";
import { WorkspaceTaskTreeContainer } from "view/containers/WorkspaceTaskTreeContainer";
import { Header } from "../../components/Header";
import FullScreen from "../../components/Layout/FullScreen";

interface IWorkspacePageProps {
  operation: "task-tree" | "project-list";
}

export default function WorkspacePage({ operation }: IWorkspacePageProps) {
  const { projectId } = useParams();
  return (
    <FullScreen>
      <Header />
      {operation === "task-tree" && <WorkspaceTaskTreeContainer />}
      {operation === "project-list" && <WorkspaceProjectListContainer />}
    </FullScreen>
  );
}
