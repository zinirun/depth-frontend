import useSyncronizeProjects from "util/hooks/useSyncronizeProjects";
import Button from "view/components/Button";
import ProjectCard from "view/components/Card/ProjectCard";
import GridSection from "view/components/Layout/GridSection";
import PrimaryContentSection from "view/components/Layout/PrimaryContentSection";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import { ReactComponent as AddIcon } from "assets/common/AddBlackIcon.svg";
import { useEffect } from "react";
import useHeader from "util/hooks/useHeader";
import useModal from "util/hooks/useModal";
import CreateProjectModalContent from "./CreateProjectModalContent";

export function WorkspaceProjectListContainer() {
  const { close } = useModal();
  useEffect(() => {
    return () => close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { projects, refetch } = useSyncronizeProjects();
  const { initialize } = useHeader();
  const { setModal } = useModal();
  useEffect(() => {
    refetch().catch(() => {});
  }, [refetch]);
  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickCreate = () => {
    setModal({
      visible: true,
      title: "Create Project",
      content: <CreateProjectModalContent />,
    });
  };

  return (
    <PrimaryContentSection padding="24px">
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
    </PrimaryContentSection>
  );
}
