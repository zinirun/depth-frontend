import { useRecoilState } from "recoil";
import { CustomzizedState } from "recoil/atoms";

type ProjectViewLayoutType = "horizontal" | "vertical";
export interface ICustomizedOption {
  focus?: string; // taskId
  folds?: string[]; // taskId[]
  layout?: ProjectViewLayoutType;
  hideDone?: boolean;
}

export default function useCustomized(projectId?: string) {
  const [customizedByProjectId, setCustomizedByProjectId] =
    useRecoilState(CustomzizedState);
  const {
    focus,
    folds,
    layout = "vertical",
    hideDone = false,
  } = (projectId && customizedByProjectId[projectId]) || {};

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

  const setLayout = (layout: ProjectViewLayoutType) => {
    if (!projectId || !layout) return;
    setCustomizedByProjectId({
      ...customizedByProjectId,
      [projectId]: {
        ...(customizedByProjectId[projectId] || {}),
        layout,
      },
    });
  };

  const setHideDone = (hideDone: boolean) => {
    if (!projectId) return;
    setCustomizedByProjectId({
      ...customizedByProjectId,
      [projectId]: {
        ...(customizedByProjectId[projectId] || {}),
        hideDone,
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
    setLayout,
    setHideDone,
    taskViewFocus: focus,
    taskFolds: folds,
    layout,
    hideDone,
  };
}
