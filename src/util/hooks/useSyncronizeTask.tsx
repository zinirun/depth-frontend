import { useLazyQuery } from "@apollo/react-hooks";
import { TASKS_BY_PROJECT_ID } from "api/queries/tasksByProjectId";
import { ITask } from "configs/interfaces/common/task.interface";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { TaskStore } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";

export default function useSyncronizeTask(projectId?: string) {
  const [tasksByProjectId, setTasksByProjectId] = useRecoilState(TaskStore);
  const [tasks, setTasks] = useState<ITask[]>([]);
  // TODO: command params, what refetch?
  const [getTasksByProjectId, { refetch: refetchTasks, loading, data }] =
    useLazyQuery<{ tasksByProjectId: ITask[] }, { projectId: string }>(
      TASKS_BY_PROJECT_ID,
      {
        variables: {
          projectId: projectId!,
        },
      }
    );

  useEffect(() => {
    async function sync() {
      await getTasksByProjectId();
    }
    if (projectId) {
      sync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const result = data?.tasksByProjectId;
      setTasks(result);
      projectId &&
        setTasksByProjectId({
          ...tasksByProjectId,
          [projectId]: result,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const init = () => {
    setTasks([]);
  };

  const refetch = async () => {
    await refetchTasks();
  };

  return { tasks, refetch, loading, init };
}
