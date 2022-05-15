import { useEffect } from "react";
import useModal from "util/hooks/useModal";
import useSyncronizeProjects from "util/hooks/useSyncronizeProjects";
import Button from "view/components/Button";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import CreateProjectModalContent from "../CreateProjectModalContent";
import { ReactComponent as AddIcon } from "assets/common/AddBlackIcon.svg";
import GridSection from "view/components/Layout/GridSection";
import ProjectCard from "view/components/Card/ProjectCard";

export default function ProjectsContainer() {
  const { projects, refetch } = useSyncronizeProjects();
  const { setModal } = useModal();
  useEffect(() => {
    refetch().catch(() => {});
  }, [refetch]);

  const handleClickCreate = () => {
    setModal({
      visible: true,
      title: "Create Project",
      content: <CreateProjectModalContent />,
    });
  };
  return (
    <>
      <RowFlexSection justifyContent="flex-start" margin="0 0 16px">
        <Button
          borderless
          hoverBlueOutline
          fontSize="0.8rem"
          icon={<AddIcon width={12} height={12} />}
          onClick={handleClickCreate}
        >
          Create
        </Button>
      </RowFlexSection>
      <GridSection gap={24}>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </GridSection>
    </>
  );
}
