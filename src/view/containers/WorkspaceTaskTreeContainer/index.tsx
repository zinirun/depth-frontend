import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHeader from "util/hooks/useHeader";
import useSyncronizeTask from "util/hooks/useSyncronizeTask";
import { TaskCard } from "view/components/Card/TaskCard";
import PrimaryContentSection from "view/components/Layout/PrimaryContentSection";

export function WorkspaceTaskTreeContainer() {
  const { projectId } = useParams();
  const { syncProject } = useHeader();
  const { tasks, init } = useSyncronizeTask(projectId);
  useEffect(() => {
    if (projectId) {
      init();
      syncProject(projectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <PrimaryContentSection padding="24px 32px 0">
      {tasks.map((task) => (
        <TaskCard depth={1} task={task} key={task._id} />
      ))}
    </PrimaryContentSection>
  );
}
