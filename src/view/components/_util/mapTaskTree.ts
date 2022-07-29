import { ITaskTree } from "configs/interfaces/common/task-tree.interface";

export default function mapSubProperties(
  tasks: ITaskTree[],
  parentId?: string
) {
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
