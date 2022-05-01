import { useMutation } from "@apollo/react-hooks";
import { CREATE_TASK, ICreateTaskInput } from "api/mutations/create-task";
import { ITask } from "configs/interfaces/common/task.interface";
import { SystemColor } from "configs/styles/colors";
import { useReward } from "react-rewards";
import styled from "styled-components";
import useSyncronizeTask from "util/hooks/useSyncronizeTask";
import errorLogger from "util/logger/error-logger";
import RowFlexSection from "../Layout/RowFlexSection";
import Typo from "../Typo/Typo";

export function EmptyTaskCard({ projectId }: { projectId: string }) {
  const { reward } = useReward("reward-target", "emoji", {
    emoji: ["🎉"],
    lifetime: 200,
    elementSize: 16,
    spread: 60,
  });
  const { refetch } = useSyncronizeTask(projectId);
  const [createTask, { loading }] = useMutation<
    { createTask: ITask },
    { task: ICreateTaskInput }
  >(CREATE_TASK);

  const handleCreate = async () => {
    if (loading) {
      return;
    }
    reward();
    try {
      const newChild = {
        projectId,
        title: "",
      };
      await createTask({
        variables: {
          task: newChild,
        },
      });
      await refetch();
    } catch (err) {
      errorLogger(
        new Error(`cannot create new children: ${(err as Error).message}`)
      );
    }
  };
  return (
    <CardContainer onClick={handleCreate}>
      <RowFlexSection gap={8}>
        <Typo>🎉</Typo>
        <Typo id="reward-target-emptycard" fontSize="0.85rem">
          Create first task
        </Typo>
      </RowFlexSection>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  width: 360px;
  height: 60px;
  background: white;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  margin-left: 24px;
  padding: 0 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  :hover {
    outline: 1px solid ${SystemColor.Blue50};
  }
`;
