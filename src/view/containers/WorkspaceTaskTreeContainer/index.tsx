import { Tree } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useHeader from "util/hooks/useHeader";
import useScroll from "util/hooks/useScroll";
import useSyncronizeTask from "util/hooks/useSyncronizeTask";
import { EmptyTaskCard } from "view/components/Card/EmptyTaskCard";
import { TaskCard } from "view/components/Card/TaskCard";
import PrimaryContentSection from "view/components/Layout/PrimaryContentSection";
import { ReactComponent as ExpandIcon } from "assets/common/FoldIcon.svg";

export function WorkspaceTaskTreeContainer() {
  const { projectId } = useParams();
  const { syncProject } = useHeader();
  const { tasks, init, loading } = useSyncronizeTask(projectId);
  useEffect(() => {
    if (projectId) {
      init();
      syncProject(projectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const _ = useScroll(projectId);

  return (
    <PrimaryContentSection padding="24px 32px 24px 8px">
      {!loading &&
        (tasks.length ? (
          <TreeContainer>
            <Tree
              draggable={{
                icon: false,
              }}
              treeData={tasks as any}
              titleRender={(task: any) => (
                <TaskCard depth={1} task={task} key={task._id} />
              )}
              fieldNames={{
                key: "_id",
              }}
              defaultExpandAll
              switcherIcon={<SwitcherIcon />}
              selectable={false}
            />
          </TreeContainer>
        ) : (
          projectId && <EmptyTaskCard projectId={projectId} />
        ))}
    </PrimaryContentSection>
  );
}

const SwitcherIcon = () => {
  return (
    <span role="img" aria-label="caret-down" className="ant-tree-switcher-icon">
      <ExpandIcon width={22} />
    </span>
  );
};

const TreeContainer = styled.div`
  .ant-tree {
    background-color: transparent;
  }
  .ant-tree .ant-tree-treenode {
    padding: 0;
    margin-bottom: 12px;
    align-items: center;
  }
  .ant-tree .ant-tree-indent-unit {
    width: 40px;
  }
  .ant-tree .ant-tree-switcher {
    align-self: auto;
  }
  .ant-tree .ant-tree-node-content-wrapper {
    cursor: default;
    transition: none;
    padding: 0;
    :hover {
      background-color: transparent;
    }
  }
`;
