import useSyncronizeProject from "util/hooks/useSyncronizeProject";
import Button from "view/components/Button";
import ProjectCard from "view/components/Card/ProjectCard";
import GridSection from "view/components/Layout/GridSection";
import PrimaryContentSection from "view/components/Layout/PrimaryContentSection";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import { ReactComponent as AddIcon } from "assets/common/AddBlackIcon.svg";
import { useEffect } from "react";

export function WorkspaceProjectListContainer() {
  const { projects, refetch } = useSyncronizeProject();
  useEffect(() => {
    refetch().catch(() => {});
  }, [refetch]);
  return (
    <PrimaryContentSection padding="24px">
      <RowFlexSection justifyContent="flex-start" margin="0 0 16px">
        <Button
          borderless
          fontSize="0.8rem"
          icon={<AddIcon width={12} height={12} />}
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
