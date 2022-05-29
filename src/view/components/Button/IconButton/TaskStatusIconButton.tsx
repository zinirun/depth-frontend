import styled from "styled-components";
import { ReactComponent as DoneIcon } from "assets/common/Stack3Icon.svg";
import { ReactComponent as OnGoingIcon } from "assets/common/Stack2Icon.svg";
import { ReactComponent as ReadyIcon } from "assets/common/Stack1Icon.svg";
import { ReactComponent as SetNextIcon } from "assets/common/ExpandRightIcon.svg";
import { TaskStatus } from "configs/interfaces/common/task.interface";
import { Tooltip } from "antd";
import Typo from "view/components/Typo/Typo";
import { useReward } from "react-rewards";

const steps = ["Ready", "OnGoing", "Done"];
export function getPrevTaskStatus(status?: TaskStatus) {
  const stepIndex = steps.findIndex((step) => step === status);
  if (stepIndex === -1 || stepIndex === 0) {
    return undefined;
  }
  const nextStatus = steps[(stepIndex - 1) % steps.length];
  return nextStatus as TaskStatus;
}
export function getNextTaskStatus(status?: TaskStatus) {
  const stepIndex = steps.findIndex((step) => step === status);
  if (stepIndex === steps.length - 1) {
    return undefined;
  }
  const nextStatus = steps[(stepIndex + 1) % steps.length];
  return nextStatus as TaskStatus;
}
export function getToggleTaskStatus(status?: TaskStatus) {
  const stepIndex = steps.findIndex((step) => step === status);
  if (stepIndex === steps.length - 1 || stepIndex === -1) {
    return "Ready";
  }
  const nextStatus = steps[(stepIndex + 1) % steps.length];
  return nextStatus as TaskStatus;
}

export default function TaskStatusIconButton({
  status,
  setStatus,
  setChanged,
  big,
}: {
  status?: TaskStatus;
  setStatus?: React.Dispatch<React.SetStateAction<TaskStatus | undefined>>;
  setChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  big?: boolean;
}) {
  const { reward } = useReward("reward-target", "emoji", {
    emoji: ["💛", "💚", "💙", "🧡", "💜", "❤️"],
    lifetime: 160,
    elementSize: 14,
    elementCount: 25,
    spread: 60,
  });
  const nextStatus = getToggleTaskStatus(status);
  const handleClick = () => {
    setStatus && nextStatus && setStatus(nextStatus as TaskStatus);
    if (nextStatus === "Done") {
      reward();
    }
    setChanged && setChanged(true);
  };
  return (
    <Tooltip
      title={
        <Typo color="white" fontSize="0.8rem">
          Set status to {nextStatus || "Ready"}
        </Typo>
      }
    >
      <Button onClick={handleClick} big={big} id="reward-target-detail">
        {status === "Ready" && <ReadyIcon />}
        {status === "OnGoing" && <OnGoingIcon />}
        {status === "Done" && <DoneIcon />}
        {!status && <SetNextIcon />}
      </Button>
    </Tooltip>
  );
}
const Button = styled.span<{ big?: boolean }>`
  cursor: pointer;
  svg {
    width: ${(props) => (props.big ? 32 : 24)}px;
    height: ${(props) => (props.big ? 32 : 24)}px;
  }
`;
