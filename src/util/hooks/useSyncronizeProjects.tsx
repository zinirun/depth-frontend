import { useQuery } from "@apollo/react-hooks";
import { PROJECTS } from "api/queries/projects";
import { IProject } from "configs/interfaces/common/project.interface";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ProjectsState } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";

export default function useSyncronizeProjects() {
  const [projects, setProjects] = useRecoilState(ProjectsState);
  const { data, loading, error, refetch } = useQuery<{ projects: IProject[] }>(
    PROJECTS
  );
  useEffect(() => {
    if (data) {
      setProjects(data.projects);
    }
  }, [data, setProjects]);
  useEffect(() => {
    if (error) {
      errorLogger(error);
    }
  }, [error]);
  return { projects, refetch, loading };
}
