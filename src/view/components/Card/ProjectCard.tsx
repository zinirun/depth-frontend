import { IProject } from "configs/interfaces/common/project.interface";
import { SystemColor } from "configs/styles/colors";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProfileBadges } from "../Badge/ProfileBadge";
import ColumnFlexSection from "../Layout/ColumnFlexSection";
import RowFlexSection from "../Layout/RowFlexSection";
import Line from "../Line";
import Typo from "../Typo/Typo";

interface IProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: IProjectCardProps) {
  const navigate = useNavigate();
  const onClickCard = () => {
    navigate(`/workspace/tasktree/${project._id}`);
  };
  return (
    <CardContainer onClick={onClickCard}>
      <Typo fontSize="0.9rem" padding="0 12px 8px">
        {project.title}
      </Typo>
      <Line />
      <RowFlexSection justifyContent="space-between" padding="12px 12px 0">
        <ColumnFlexSection gap={3}>
          <Typo fontSize="0.7rem" color={SystemColor.Grey50}>
            by {project.manager.name || project.manager.email}
          </Typo>
          <Typo fontSize="0.7rem" color={SystemColor.Grey50}>
            {project.taskUpdatedAt
              ? `Updated ${moment(project.taskUpdatedAt).local().fromNow()}`
              : `Created ${moment(project.createdAt).local().fromNow()}`}
          </Typo>
        </ColumnFlexSection>
        <ProfileBadges users={project.accesses} />
      </RowFlexSection>
    </CardContainer>
  );
}

export function NewProjectCard() {
  return (
    <NewCardContainer>
      <Typo fontSize="0.9rem">Create new project</Typo>
    </NewCardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 5px;
  padding: 12px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    box-shadow: rgb(15 15 15 / 5%) 0px 2px 4px;
  }
`;

const NewCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 8px 12px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    box-shadow: rgb(15 15 15 / 5%) 0px 2px 4px;
  }
`;
