import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  IMoveTaskChildInput,
  MOVE_TASK_CHILD,
} from "api/mutations/move-task-child";
import { TASK_TREE } from "api/queries/taskTree";
import { ITaskTree } from "configs/interfaces/common/task-tree.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TaskTreeStore } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";

export default function useTaskTree(projectId: string | undefined) {
  const navigate = useNavigate();
  const [taskTreeByProjectId, setTaskTreeByProjectId] =
    useRecoilState(TaskTreeStore);
  const taskTree = projectId && taskTreeByProjectId[projectId];
  const [fetchTaskTree, { data, refetch, loading, error }] = useLazyQuery<
    { taskTree: ITaskTree[] },
    { projectId: string }
  >(TASK_TREE, {
    variables: {
      projectId: projectId!,
    },
  });

  useEffect(() => {
    async function fetch() {
      await fetchTaskTree();
    }
    if (!taskTree && projectId) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskTree]);

  useEffect(() => {
    if (data) {
      if (!projectId) {
        return;
      }
      const _taskTree = mapSubProperties(data.taskTree);
      setTaskTreeByProjectId((prev) => ({
        ...prev,
        [projectId]: _taskTree,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function mapSubProperties(tasks: ITaskTree[], parentId?: string) {
    let _tasks: ITaskTree[] = tasks.map((task) => ({
      ...task,
      key: task._id,
      parentId: parentId || undefined,
      children: task.children?.length
        ? mapSubProperties(task.children, task._id)
        : [],
    }));
    return _tasks;
  }

  function filterDoneTasks(tasks: ITaskTree[]) {
    let _tasks: ITaskTree[] = tasks.reduce((doneTasks, task) => {
      if (task.status !== "Done") {
        doneTasks.push({
          ...task,
          children: task.children?.length ? filterDoneTasks(task.children) : [],
        });
      }
      return doneTasks;
    }, [] as ITaskTree[]);
    return _tasks;
  }

  useEffect(() => {
    if (error) {
      errorLogger(new Error(`cannot syncronize tasks: ${error.message}`));
      navigate("/error", {
        state: {
          message: "Project not found",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const [moveTaskChild] = useMutation<
    { moveTaskChild: ITask[] },
    { input: IMoveTaskChildInput }
  >(MOVE_TASK_CHILD);

  const moveChild = async (input: IMoveTaskChildInput) => {
    try {
      const { data } = await moveTaskChild({
        variables: { input },
      });
      await refetch();
      return data?.moveTaskChild;
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  return {
    taskTree: taskTree || [],
    filterDoneTasks,
    loading,
    refetch,
    moveChild,
  };
}
