import { Form, Input, Select } from "antd";
import { ICreateProjectInput } from "api/mutations/create-project";
import { useNavigate } from "react-router-dom";
import useProjectModal from "util/hooks/useProjectModal";
import errorLogger from "util/logger/error-logger";
import Button from "view/components/Button";
import Typo from "view/components/Typo/Typo";

export default function CreateProjectModalContent() {
  const { users, createProject, close } = useProjectModal();
  const navigate = useNavigate();

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
        <Input placeholder="New Project" autoFocus />
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
