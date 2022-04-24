import { useMutation, useQuery } from "@apollo/react-hooks";
import { Form, Input, Select } from "antd";
import {
  CREATE_PROJECT,
  ICreateProjectInput,
} from "api/mutations/create-project";
import { COMPANY_USERS } from "api/queries/companyUsers";
import { IProject } from "configs/interfaces/common/project.interface";
import { IUser } from "configs/interfaces/common/user.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "util/hooks/useModal";
import errorLogger from "util/logger/error-logger";
import Button from "view/components/Button";
import Typo from "view/components/Typo/Typo";

export default function CreateProjectModalContent() {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();
  const {
    data: userData,
    error: userError,
    refetch: refetchUsers,
  } = useQuery<{
    companyUsers: IUser[];
  }>(COMPANY_USERS);
  const [createProject] = useMutation<
    { createProject: IProject },
    { project: ICreateProjectInput }
  >(CREATE_PROJECT);
  const { close } = useModal();

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

  const handleSubmit = async (project: ICreateProjectInput) => {
    try {
      const { data } = await createProject({
        variables: {
          project: { ...project, accesses: project.accesses || [] },
        },
      });
      close();
      const projectId = data?.createProject?._id;
      if (projectId) {
        navigate(`/workspace/tasktree/${projectId}`);
      }
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
      <Form.Item
        name="title"
        label={<Typo fontSize="0.85rem">Project Title</Typo>}
        rules={[
          {
            required: true,
            message: "Project title is required",
          },
        ]}
      >
        <Input placeholder="New Project" />
      </Form.Item>
      <Form.Item
        name="accesses"
        shouldUpdate
        label={<Typo fontSize="0.85rem">Assigned Members</Typo>}
      >
        <Select
          showSearch
          mode="multiple"
          allowClear
          placeholder="Select members"
          optionFilterProp="children"
        >
          {users.map((user) => (
            <Select.Option value={user._id} key={user._id}>
              {user.name} ({user.email})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button block type="submit" hoverBlueOutline>
        Create
      </Button>
    </Form>
  );
}
