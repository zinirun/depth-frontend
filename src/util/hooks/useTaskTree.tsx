import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  IMoveTaskChildInput,
  MOVE_TASK_CHILD,
} from "api/mutations/move-task-child";
import { TASKS_BY_PROJECT_ID } from "api/queries/tasksByProjectId";
import { TASK_TREE } from "api/queries/taskTree";
import { ITaskTree } from "configs/interfaces/common/task-tree.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FlatTasksStore, TaskTreeStore } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";
import flattenTasks from "view/components/_util/flattenTasks";
import mapSubProperties from "view/components/_util/mapTaskTree";

export default function useTaskTree(projectId: string | undefined) {
  const navigate = useNavigate();
  const [taskTreeByProjectId, setTaskTreeByProjectId] =
    useRecoilState(TaskTreeStore);
  const setFlatTasks = useSetRecoilState(FlatTasksStore);
  const taskTree = projectId && taskTreeByProjectId[projectId];
  const [fetchTaskTree, { data, refetch, loading, error }] = useLazyQuery<
    { taskTree: ITaskTree[] },
    { projectId: string }
  >(TASK_TREE, {
    variables: {
      projectId: projectId!,
    },
  });
  const [fetchTasksByProjectId] = useLazyQuery<
    { tasksByProjectId: ITask[] },
    { projectId: string }
  >(TASKS_BY_PROJECT_ID, {
    variables: {
      projectId: projectId!,
    },
  });

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await fetchTasksByProjectId();
        if (!data?.tasksByProjectId) {
          return;
        }
        const _flatTasks = flattenTasks(data.tasksByProjectId);
        setFlatTasks((prev) => ({
          ...prev,
          ..._flatTasks,
        }));
      } catch (err) {
        errorLogger(err as Error);
      }
    }
    if (projectId) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
