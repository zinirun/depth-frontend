import { useEffect } from "react";
import useSyncronizeToday from "util/hooks/useSyncronizeToday";
import useHeader from "util/hooks/useHeader";
import MainTaskCard from "view/components/Card/MainTaskCard";
import { ITask } from "configs/interfaces/common/task.interface";
import ColumnFlexSection from "view/components/Layout/ColumnFlexSection";
import Typo from "view/components/Typo/Typo";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import { IProject } from "configs/interfaces/common/project.interface";
import styled from "styled-components";
import { SystemColor } from "configs/styles/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "view/components/Button/IconButton";
import { ReactComponent as CopyIcon } from "assets/common/PostitIcon.svg";
import { message } from "antd";

export default function MyTasksContainer() {
  const { myTasks: tasks, refetch } = useSyncronizeToday();
  const { setOperation } = useHeader();

  useEffect(() => {
    refetch().catch(() => {});
  }, [refetch]);
  useEffect(() => {
    setOperation("main");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RowFlexSection
        gap={32}
        justifyContent="flex-start"
        alignItems="flex-start"
        width="fit-content"
      >
        <TaskSection title="Today" tasks={tasks.today} />
        <TaskSection title="This Week" tasks={tasks.thisWeek} />
        <TaskSection title="Last 3 days created" tasks={tasks.recent} />
      </RowFlexSection>
    </>
  );
}

function TaskSection({
  title,
  tasks: originalTasks,
}: {
  title: string;
  tasks: ITask[];
}) {
  const tasksByProject: Record<string, { project: IProject; tasks: ITask[] }> =
    originalTasks.reduce((record, task) => {
      const { project } = task;
      const targetProject = record[project._id];
      if (targetProject) {
        record[project._id] = {
          ...targetProject,
          tasks: [...targetProject.tasks, task],
        };
      } else {
        record[project._id] = {
          project,
          tasks: [task],
        };
      }
      return record;
    }, {} as Record<string, { project: IProject; tasks: ITask[] }>);
  const createMarkdown = () => {
    let text = ``;
    const totalProjectCount = Object.keys(tasksByProject).length;
    Object.keys(tasksByProject).forEach((projectId, index) => {
      const record = tasksByProject[projectId];
      if (record.tasks.length) {
        text += `- ${record.project.title}`;
        text +=
          "\r\n    - " +
          record.tasks.map((task) => task.title).join("\r\n    - ");
        if (index !== totalProjectCount) {
          text += "\r\n";
        }
      }
    });
    return text;
  };
  const copiedText = createMarkdown();

  return (
    <SectionContainer>
      <RowFlexSection justifyContent="space-between">
        <Typo color="#333">{title}</Typo>
        <CopyToClipboard
          text={copiedText}
          onCopy={() => message.success("Task list copied to clipboard")}
        >
          <IconButton hoverColor="#777">
            <CopyIcon width={20} height={20} />
          </IconButton>
        </CopyToClipboard>
      </RowFlexSection>
      {Object.keys(tasksByProject).length ? (
        Object.keys(tasksByProject).map((projectId) => {
          const record = tasksByProject[projectId];
          return (
            <ColumnFlexSection key={projectId} gap={12}>
              <Typo color={SystemColor.Grey50} fontSize="0.8rem">
                {record.project.title}
              </Typo>
              {record.tasks.map((task) => (
                <MainTaskCard task={task} key={task._id} />
              ))}
            </ColumnFlexSection>
          );
        })
      ) : (
        <Typo color="#777" fontSize="0.8rem">
          No Tasks
        </Typo>
      )}
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  display: flex;
  width: calc(360px + 32px);
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(57, 58, 64, 0.16);
`;
