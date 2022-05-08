import { Form, Input, Select } from "antd";
import { IUpdateProjectInput } from "api/mutations/update-project";
import useHeader from "util/hooks/useHeader";
import useProjectModal from "util/hooks/useProjectModal";
import errorLogger from "util/logger/error-logger";
import Button from "view/components/Button";
import Typo from "view/components/Typo/Typo";

export default function UpdateProjectModalContent({ id }: { id: string }) {
  const {
    usersWithMe: users,
    updateProject,
    updateProjectLoading: loading,
    close,
    me,
  } = useProjectModal();
  const {
    syncProject,
    header: { project },
  } = useHeader();
  const title = project?.title;
  const accesses = project?.accesses.map((user) => user._id);

  const handleSubmit = async (project: Omit<IUpdateProjectInput, "id">) => {
    try {
      await updateProject({
        variables: {
          project: { ...project, id, accesses: project.accesses || [] },
        },
      });
      close();
      await syncProject(id);
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  return (
    <>
      {title && accesses && (
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
            initialValue={title}
          >
            <Input placeholder="New Project" autoFocus />
          </Form.Item>
          <Form.Item
            name="accesses"
            shouldUpdate
            label={<Typo fontSize="0.85rem">Assigned Members</Typo>}
            initialValue={accesses}
          >
            <Select
              showSearch
              mode="multiple"
              allowClear
              placeholder="Select members"
              optionFilterProp="children"
            >
              {users.map((user) => (
                <Select.Option
                  value={user._id}
                  key={user._id}
                  disabled={user._id === me?._id}
                >
                  {user.name} ({user.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button block type="submit" hoverBlueOutline disabled={loading}>
            Save
          </Button>
        </Form>
      )}
    </>
  );
}
