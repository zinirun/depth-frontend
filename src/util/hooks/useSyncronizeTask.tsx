import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  IMoveTaskChildInput,
  MOVE_TASK_CHILD,
} from "api/mutations/move-task-child";
import { TASKS_BY_PROJECT_ID } from "api/queries/tasksByProjectId";
import { ITask } from "configs/interfaces/common/task.interface";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FlatTaskStore, TaskStore } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";
import flattenTasks from "view/components/_util/flattenTasks";

export default function useSyncronizeTask(projectId?: string) {
  const [tasksByProjectId, setTasksByProjectId] = useRecoilState(TaskStore);
  const [flatTasksByProjectId, setFlatTasksByProjectId] =
    useRecoilState(FlatTaskStore);
  const flatTasks = flatTasksByProjectId[projectId || ""];
  const tasks = (projectId && tasksByProjectId[projectId]) || [];

  // TODO: command params, what refetch?
  const [getTasksByProjectId, { refetch: refetchTasks, loading, data, error }] =
    useLazyQuery<{ tasksByProjectId: ITask[] }, { projectId: string }>(
      TASKS_BY_PROJECT_ID,
      {
        variables: {
          projectId: projectId!,
        },
      }
    );
  const [moveTaskChild] = useMutation<
    { moveTaskChild: ITask[] },
    { input: IMoveTaskChildInput }
  >(MOVE_TASK_CHILD);

  const moveChild = async (input: IMoveTaskChildInput) => {
    try {
      const { data } = await moveTaskChild({
        variables: { input },
      });
      await refetchTasks();
      return data?.moveTaskChild;
    } catch (err) {
      errorLogger(err as Error);
    }
  };

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
      const result = mapSubProperties(data?.tasksByProjectId);
      if (projectId) {
        setTasksByProjectId({
          ...tasksByProjectId,
          [projectId]: result,
        });
        setFlatTasksByProjectId({
          ...flatTasksByProjectId,
          [projectId]: flattenTasks(result),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function mapSubProperties(tasks: ITask[], parentId?: string) {
    let _tasks: ITask[] = tasks.map((task) => ({
      ...task,
      key: task._id,
      parentId: parentId || undefined,
      children: task.children?.length
        ? mapSubProperties(task.children, task._id)
        : undefined,
    }));
    return _tasks;
  }

  useEffect(() => {
    if (error) {
      errorLogger(new Error(`cannot syncronize tasks: ${error.message}`));
    }
  }, [error]);

  const init = () => {
    if (projectId) {
      const { [projectId]: _, ...rest } = tasksByProjectId;
      setTasksByProjectId(rest);
    }
  };

  const refetch = async () => {
    await refetchTasks();
  };

  return {
    tasks,
    refetch,
    loading,
    init,
    flatTasks,
    moveChild,
  };
}
