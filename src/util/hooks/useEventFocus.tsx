import { useRecoilState } from "recoil";
import { TaskEventFocusState } from "recoil/atoms";

export default function useEventFocus() {
  const [taskEventFocus, setTaskEventFocus] =
    useRecoilState(TaskEventFocusState);

  const init = () => {
    setTaskEventFocus(undefined);
  };

  return {
    taskEventFocus,
    setTaskEventFocus,
    init,
  };
}
