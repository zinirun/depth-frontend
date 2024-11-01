import { Tree } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useHeader from "util/hooks/useHeader";
import useScroll from "util/hooks/useScroll";
import { EmptyTaskCard } from "view/components/Card/EmptyTaskCard";
import { TaskCard } from "view/components/Card/TaskCard";
import PrimaryContentSection from "view/components/Layout/PrimaryContentSection";
import { ReactComponent as ExpandIcon } from "assets/common/FoldIcon.svg";
import errorLogger from "util/logger/error-logger";
import useCustomized from "util/hooks/useCustomized";
import useTaskTree from "util/hooks/useTaskTree";

export function WorkspaceTaskTreeContainer() {
  const { projectId } = useParams();
  const { syncProject } = useHeader();
  const {
    taskTree: tasks,
    loading,
    moveChild,
    filterDoneTasks,
  } = useTaskTree(projectId);
  useEffect(() => {
    if (projectId) {
      syncProject(projectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useScroll(projectId);
  const { layout, hideDone } = useCustomized(projectId);
  const customizedTasks = hideDone ? filterDoneTasks(tasks) : tasks;

  const handleDrop = async ({
    dragNode: fromNode,
    node: toNode,
    dropPosition,
    dropToGap,
  }: any) => {
    if (!fromNode || !toNode) {
      return;
    }
    const { _id: childId, parentId: fromParentId } = fromNode;
    const { parentId: destParentId, pos } = toNode;
    const dropPos = pos.split("-");
    const dropIndex = dropPosition - Number(dropPos[dropPos.length - 1]);

    let sortIndex = 0;
    let toParentId = destParentId;
    if (dropToGap && dropIndex === 1) {
      // move in children except first child (sortIndex === dropPosition)
      sortIndex = dropPosition;
    } else if (!dropToGap && dropIndex === 0) {
      // move to first child in any depth (toParent === toNode, sortIndex === 0)
      toParentId = toNode._id;
      sortIndex = 0;
    } else if (dropToGap && dropIndex === -1) {
      // move to top depth
      toParentId = undefined;
      sortIndex = 0;
    } else {
      // can't catch
      errorLogger(new Error("cannot calculate drag event"));
      console.log("-----------------------------");
      console.log("dropPosition: " + dropPosition);
      console.log("dropPos: " + Number(dropPos[dropPos.length - 1]));
      console.log("dropIndex: " + dropIndex);
      console.log("dropGap: " + dropToGap);
      console.log("from: " + fromNode.title + " / to: " + toNode.title);
      return;
    }

    await moveChild({
      fromParentId,
      toParentId,
      childId,
      sortIndex,
    });
  };

  return (
    <PrimaryContentSection padding="24px 32px 24px 8px">
      {!loading &&
        (tasks.length ? (
          <TreeContainer>
            {layout === "horizontal" ? (
              customizedTasks.map((topTask) => (
                <Tree
                  key={topTask._id}
                  onDrop={handleDrop}
                  draggable={{
                    icon: false,
                  }}
                  treeData={[topTask]}
                  titleRender={(task) => (
                    <TaskCard
                      id={task._id}
                      key={task._id}
                      parentId={task.parentId}
                    />
                  )}
                  defaultExpandAll
                  autoExpandParent
                  switcherIcon={<SwitcherIcon />}
                  selectable={false}
                />
              ))
            ) : (
              <Tree
                onDrop={handleDrop}
                draggable={{
                  icon: false,
                }}
                treeData={customizedTasks}
                titleRender={(task) => (
                  <TaskCard
                    id={task._id}
                    key={task._id}
                    parentId={task.parentId}
                  />
                )}
                defaultExpandAll
                autoExpandParent
                switcherIcon={<SwitcherIcon />}
                selectable={false}
              />
            )}
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
  display: flex;
  gap: 8px;
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
