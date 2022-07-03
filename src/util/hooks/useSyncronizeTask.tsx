import { useLazyQuery } from "@apollo/react-hooks";
import { TASK } from "api/queries/task";
import { ITask } from "configs/interfaces/common/task.interface";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FlatTasksStore } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";

export default function useSyncronizeTask(id: string) {
  const [flatTasks, setFlatTasks] = useRecoilState(FlatTasksStore);
  const task = flatTasks[id];
  const [fetchTask, { data, loading, error, refetch }] = useLazyQuery<
    { task: ITask },
    { id: string }
  >(TASK, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    async function fetch() {
      await fetchTask();
    }
    setTimeout(() => {
      if (!task) {
        fetch();
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  useEffect(() => {
    if (data) {
      setFlatTasks((prev) => ({
        ...prev,
        [id]: data.task,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      errorLogger(new Error(`cannot syncronize task: ${error.message}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return {
    task,
    tasks: flatTasks,
    refetch,
    loading,
  };
}
