import { Menu } from "antd";
import Typo from "../Typo/Typo";

interface IProjectOverlayProps {
  openUpdateProjectModal?: () => void;
}

const ProjectOverlay = ({ openUpdateProjectModal }: IProjectOverlayProps) => {
  return (
    <Menu
      items={
        [
          {
            label: (
              <Typo fontSize="0.8rem" onClick={openUpdateProjectModal}>
                Edit Project
              </Typo>
            ),
          },
          {
            label: <Typo fontSize="0.8rem">Trash bin</Typo>,
          },
        ] as any
      }
    />
  );
};

export default ProjectOverlay;
