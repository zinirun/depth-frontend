import { useRecoilState } from "recoil";
import { CustomzizedState } from "recoil/atoms";

export interface ICustomizedOption {
  focus?: string; // taskId
  folds?: string[]; // taskId[]
}

export default function useCustomized(projectId?: string) {
  const [customizedByProjectId, setCustomizedByProjectId] =
    useRecoilState(CustomzizedState);
  const { focus, folds } =
    (projectId && customizedByProjectId[projectId]) || {};

  const setTaskViewFocus = (taskId?: string) => {
    if (!projectId || !taskId) return;
    setCustomizedByProjectId({
      ...customizedByProjectId,
      [projectId]: {
        ...(customizedByProjectId[projectId] || {}),
        focus: taskId,
      },
    });
  };

  const setTaskFold = (taskId?: string) => {
    if (!projectId || !taskId) return;
    setCustomizedByProjectId({
      ...customizedByProjectId,
      [projectId]: {
        ...(customizedByProjectId[projectId] || {}),
        folds: [...(customizedByProjectId[projectId]?.folds || []), taskId],
      },
    });
  };

  const init = () => {
    if (!projectId) return;
    const { [projectId]: _, ...rest } = customizedByProjectId;
    setCustomizedByProjectId(rest);
  };

  return {
    init,
    setTaskViewFocus,
    setTaskFold,
    taskViewFocus: focus,
    taskFolds: folds,
  };
}
