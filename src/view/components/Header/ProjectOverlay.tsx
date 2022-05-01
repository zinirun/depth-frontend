import { Menu } from "antd";
import Typo from "../Typo/Typo";

const ProjectOverlay = () => {
  return (
    <Menu
      items={
        [
          {
            label: <Typo fontSize="0.8rem">Modify Project</Typo>,
          },
        ] as any
      }
    />
  );
};

export default ProjectOverlay;
