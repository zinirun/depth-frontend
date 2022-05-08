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
  const [scrolledViewFocus, setScrolledViewFocus] = useState<boolean>(false);
  const [scrolledEventFocus, setScrolledEventFocus] = useState<boolean>(false);

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
    if (
      !scrolledViewFocus &&
      projectId &&
      taskViewFocus &&
      flatTasks[projectId] &&
      flatTasks[projectId][taskViewFocus]
    ) {
      scrollAndFocusByTaskId(taskViewFocus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskViewFocus, flatTasks]);

  useEffect(() => {
    if (
      !scrolledEventFocus &&
      projectId &&
      taskEventFocus &&
      flatTasks[projectId] &&
      flatTasks[projectId][taskEventFocus]
    ) {
      scrollAndFocusByTaskId(taskEventFocus, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolledEventFocus, taskEventFocus, flatTasks]);

  useEffect(() => {
    if (taskEventFocus) {
      setScrolledEventFocus(false);
    }
  }, [taskEventFocus]);

  const scrollAndFocusByTaskId = (taskId: string, isEventFocus?: boolean) => {
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
      if (isEventFocus) {
        init();
        setScrolledEventFocus(true);
      } else {
        setScrolledViewFocus(true);
      }
    }
  };

  return null;
}
