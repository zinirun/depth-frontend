import {
  OnSubscriptionDataOptions,
  useLazyQuery,
  useSubscription,
} from "@apollo/react-hooks";
import { TASK } from "api/queries/task";
import { TASK_TREE } from "api/queries/taskTree";
import { TaskEvent, TASK_EVENT } from "api/subscriptions/task-event";
import { ITaskTree } from "configs/interfaces/common/task-tree.interface";
import { ITask } from "configs/interfaces/common/task.interface";
import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { FlatTasksStore, TaskTreeStore } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";
import mapSubProperties from "view/components/_util/mapTaskTree";

export default function useSubscribeTaskEvent() {
  const [queue, setQueue] = useState<TaskEvent[]>([]);

  const setTaskTreeByProjectId = useSetRecoilState(TaskTreeStore);
  const setFlatTasks = useSetRecoilState(FlatTasksStore);

  const [fetchTaskTree] = useLazyQuery<
    { taskTree: ITaskTree[] },
    { projectId: string }
  >(TASK_TREE);
  const [fetchTask] = useLazyQuery<{ task: ITask }, { id: string }>(TASK);

  const remove = (key: string) => {
    setQueue((prev) => prev.filter((q) => q.key !== key));
  };

  useEffect(() => {
    async function processQueue() {
      for (const { key, id, projectId, command } of queue) {
        remove(key);
        try {
          if (command === "update") {
            const { data } = await fetchTask({ variables: { id } });
            if (!data?.task) {
              return;
            }
            setFlatTasks((prev) => ({
              ...prev,
              [id]: data.task,
            }));
          } else if (
            command === "create" ||
            command === "delete" ||
            command === "move"
          ) {
            const { data } = await fetchTaskTree({ variables: { projectId } });
            if (!data?.taskTree) {
              return;
            }
            const _taskTree = mapSubProperties(data.taskTree);
            setTaskTreeByProjectId((prev) => ({
              ...prev,
              [projectId]: _taskTree,
            }));
          }
        } catch (err) {
          errorLogger(err as Error);
        }
      }
    }
    if (queue.length) {
      processQueue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  const handleSubscription = ({
    subscriptionData,
  }: OnSubscriptionDataOptions<{
    taskEvent: TaskEvent;
  }>) => {
    const { data } = subscriptionData;
    if (data) {
      const { taskEvent } = data;
      if (!queue.map((q) => q.key).includes(taskEvent.key)) {
        setQueue((prev) => [...prev, taskEvent]);
      }
    }
  };
  const onSubscriptionData = useCallback(
    handleSubscription, // your handler function
    [queue]
  );
  useSubscription<{
    taskEvent: TaskEvent;
  }>(TASK_EVENT, {
    onSubscriptionData,
  });

  return { queue, remove };
}
