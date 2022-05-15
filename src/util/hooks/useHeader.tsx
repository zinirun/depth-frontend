import { useLazyQuery } from "@apollo/react-hooks";
import { PROJECT } from "api/queries/project";
import { IProject } from "configs/interfaces/common/project.interface";
import { useRecoilState } from "recoil";
import { HeaderState } from "recoil/atoms";
import errorLogger from "util/logger/error-logger";
import { HeaderOperation } from "view/components/Header";

export default function useHeader() {
  const [header, setHeader] = useRecoilState(HeaderState);
  const [getProject, { loading }] = useLazyQuery<
    { project: IProject },
    { id: string }
  >(PROJECT);

  const setOperation = (operation: HeaderOperation) => {
    setHeader({
      ...header,
      operation,
    });
  };

  const syncProject = async (projectId: string) => {
    if (!projectId) {
      return;
    }
    try {
      const { data } = await getProject({
        variables: {
          id: projectId,
        },
      });
      setHeader({
        ...header,
        operation: "project",
        project: data?.project,
        projectId: data?.project._id,
      });
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  const initialize = () => setHeader({});

  return {
    header,
    setHeader,
    syncProject,
    loading,
    initialize,
    setOperation,
  };
}
