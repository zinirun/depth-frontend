import { useQuery } from "@apollo/react-hooks";
import { MY_TASKS } from "api/queries/myTasks";
import { ITask } from "configs/interfaces/common/task.interface";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { MyTasksState } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";

export default function useSyncronizeToday() {
  const [myTasks, setMyTasks] = useRecoilState(MyTasksState);
  const { data, loading, error, refetch } = useQuery<{
    myTasks: { today: ITask[]; thisWeek: ITask[]; recent: ITask[] };
  }>(MY_TASKS);
  useEffect(() => {
    if (data) {
      setMyTasks(data.myTasks);
    }
  }, [data, setMyTasks]);
  useEffect(() => {
    if (error) {
      errorLogger(error);
    }
  }, [error]);
  return { myTasks, loading, refetch };
}
