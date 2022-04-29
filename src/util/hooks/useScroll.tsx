import ClassName from "configs/styles/class-names";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { FlatTaskStore } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";
import useCustomized from "./useCustomized";
import useEventFocus from "./useEventFocus";

export default function useScroll(projectId?: string) {
  const flatTasks = useRecoilValue(FlatTaskStore);
  const { taskEventFocus, init } = useEventFocus();
  const { taskViewFocus } = useCustomized(projectId);
  const [scrollTarget, setScrollTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const dom = document.querySelector(
      `.${ClassName.Workspace.ContentContainer}`
    );
    if (dom) {
      setScrollTarget(dom as HTMLDivElement);
    } else {
      errorLogger(new Error(`cannot get dom of scrollTarget`));
    }
  }, []);

  useEffect(() => {
    if (projectId && taskEventFocus && flatTasks[projectId][taskEventFocus]) {
      scrollAndFocusByTaskId(taskEventFocus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskEventFocus, flatTasks]);

  useEffect(() => {
    if (projectId && taskViewFocus && flatTasks[projectId][taskViewFocus]) {
      scrollAndFocusByTaskId(taskViewFocus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskViewFocus, flatTasks]);

  const scrollAndFocusByTaskId = (taskId: string) => {
    if (!scrollTarget || !taskId) {
      return;
    }
    const dom = document.getElementById(taskId);
    if (dom) {
      dom.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      const input = dom.getElementsByTagName("input");
      input?.length && input[0].focus();
      init();
      return;
    }
  };

  return null;
}
