import { ITask } from "configs/interfaces/common/task.interface";
export default function flattenTasks(tasks: ITask[]) {
  const _tasks = flattenTasksToArray(tasks);
  const store: Record<string, ITask> = {};
  _tasks.forEach((_task) => {
    store[_task._id] = _task;
  });
  return store;
}

function flattenTasksToArray(tasks: ITask[]) {
  let _flattenTasks: ITask[] = [];
  tasks.forEach((task) => {
    _flattenTasks.push(task);
    if (task.children && Array.isArray(task.children)) {
      _flattenTasks = _flattenTasks.concat(flattenTasksToArray(task.children));
    }
  });
  return _flattenTasks;
}
