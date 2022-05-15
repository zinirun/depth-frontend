import { Menu } from "antd";
import Typo from "../Typo/Typo";

interface IProjectOverlayProps {
  openUpdateProjectModal?: () => void;
  showEdit?: boolean;
}

const ProjectOverlay = ({
  openUpdateProjectModal,
  showEdit,
}: IProjectOverlayProps) => {
  return (
    <Menu
      items={
        [
          showEdit
            ? {
                label: (
                  <Typo fontSize="0.8rem" onClick={openUpdateProjectModal}>
                    Edit Project
                  </Typo>
                ),
              }
            : undefined,
          {
            label: <Typo fontSize="0.8rem">Trash bin</Typo>,
          },
        ].filter((v) => v) as any
      }
    />
  );
};

export default ProjectOverlay;
