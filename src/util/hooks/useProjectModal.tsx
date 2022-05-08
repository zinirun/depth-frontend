import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  CREATE_PROJECT,
  ICreateProjectInput,
} from "api/mutations/create-project";
import {
  IUpdateProjectInput,
  UPDATE_PROJECT,
} from "api/mutations/update-project";
import { COMPANY_USERS } from "api/queries/companyUsers";
import { IProject } from "configs/interfaces/common/project.interface";
import { IUser } from "configs/interfaces/common/user.interface";
import { useEffect, useState } from "react";
import errorLogger from "util/logger/error-logger";
import useModal from "./useModal";
import useUser from "./useUser";

export default function useProjectModal() {
  const { close } = useModal();
  const { user } = useUser();
  const [users, setUsers] = useState<IUser[]>([]);

  const {
    data: userData,
    error: userError,
    refetch: refetchUsers,
  } = useQuery<{
    companyUsers: IUser[];
  }>(COMPANY_USERS);
  const [createProject, { loading: createProjectLoading }] = useMutation<
    { createProject: IProject },
    { project: ICreateProjectInput }
  >(CREATE_PROJECT);

  const [updateProject, { loading: updateProjectLoading }] = useMutation<
    { updateProject: IProject },
    { project: IUpdateProjectInput }
  >(UPDATE_PROJECT);

  useEffect(() => {
    if (userData) {
      setUsers(userData.companyUsers);
    }
  }, [userData]);
  useEffect(() => {
    if (userError) {
      errorLogger(userError);
    }
  }, [userError]);
  useEffect(() => {
    refetchUsers().catch(() => {});
  }, [refetchUsers]);

  return {
    users,
    refetchUsers,
    usersWithMe: user ? [user, ...users] : users,
    me: user,
    createProject,
    createProjectLoading,
    updateProject,
    updateProjectLoading,
    close,
  };
}
