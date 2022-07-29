import { useMutation } from "@apollo/react-hooks";
import { CREATE_TASK, ICreateTaskInput } from "api/mutations/create-task";
import { DELETE_TASK } from "api/mutations/delete-task";
import { IUpdateTaskInput, UPDATE_TASK } from "api/mutations/update-task";
import { ITask } from "configs/interfaces/common/task.interface";

export default function useTaskMutation() {
  const [create] = useMutation<
    { createTask: ITask },
    { task: ICreateTaskInput }
  >(CREATE_TASK);
  const [update] = useMutation<
    { updateTask: ITask[] },
    { task: IUpdateTaskInput }
  >(UPDATE_TASK);
  const [remove] = useMutation<{ deleteTask: string }, { id: string }>(
    DELETE_TASK
  );

  return { create, update, remove };
}
