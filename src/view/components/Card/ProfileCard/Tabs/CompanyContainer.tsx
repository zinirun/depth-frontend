import { useMutation } from "@apollo/react-hooks";
import { Form, Input, List, message, Select } from "antd";
import {
  ICreateUserInput,
  INVITE_USER_TO_COMPANY,
} from "api/mutations/invite-user-to-company";
import { ICompany } from "configs/interfaces/common/company.interface";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import useUser from "util/hooks/useUser";
import errorLogger from "util/logger/error-logger";
import { ProfileBadge } from "view/components/Badge/ProfileBadge";
import Button from "view/components/Button";
import ColumnFlexSection from "view/components/Layout/ColumnFlexSection";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import Line from "view/components/Line";
import Typo from "view/components/Typo/Typo";

export default function CompanyContainer() {
  const { user, refetch } = useUser();
  const [inviteUser] = useMutation<
    { inviteUserToCompany: ICompany },
    { user: ICreateUserInput }
  >(INVITE_USER_TO_COMPANY);
  const company = user?.company;
  const [canInvite, setCanInvite] = useState<boolean>(false);
  const [inviteForm] = Form.useForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email" && value) {
      if (company?.users?.map((user) => user.email).includes(value)) {
        setCanInvite(false);
      } else {
        setCanInvite(true);
      }
    }
  };

  const handleSubmit = async ({
    email,
    role,
  }: {
    email: string;
    role: "Common" | "Manager" | "Admin";
  }) => {
    try {
      const { data } = await inviteUser({
        variables: { user: { email, role } },
      });
      if (data?.inviteUserToCompany) {
        setCanInvite(false);
        message.success(`Invited ${email} successfully`);
        inviteForm.resetFields();
        await refetch();
      }
    } catch (err) {
      errorLogger(err as Error);
    }
  };
  return (
    <>
      {company && (
        <ColumnFlexSection gap={16}>
          <ColumnFlexSection gap={6}>
            <Typo fontSize="0.85rem">Company Name</Typo>
            <Input
              name="name"
              onChange={handleChange}
              value={company.name}
              readOnly
            />
          </ColumnFlexSection>

          <ColumnFlexSection gap={6}>
            <Typo fontSize="0.85rem">Contact Email</Typo>
            <Input value={company.email} readOnly />
          </ColumnFlexSection>

          <ColumnFlexSection gap={6}>
            <Typo fontSize="0.85rem">Members</Typo>
            {user.role === "Admin" && (
              <Form form={inviteForm} onFinish={handleSubmit}>
                <ColumnFlexSection gap={4}>
                  <RowFlexSection justifyContent="space-between" gap={6}>
                    <Form.Item
                      name="email"
                      noStyle
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="Email"
                        name="email"
                        size="small"
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </RowFlexSection>
                  <RowFlexSection justifyContent="space-between" gap={6}>
                    <Form.Item
                      name="role"
                      initialValue="Common"
                      noStyle
                      rules={[{ required: true }]}
                    >
                      <Select
                        size="small"
                        placeholder="Select role"
                        style={{ width: "100%" }}
                      >
                        {["Common", "Manager", "Admin"].map((role) => (
                          <Select.Option value={role} key={role}>
                            as {role}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Button size="small" type="submit" disabled={!canInvite}>
                      Invite
                    </Button>
                  </RowFlexSection>
                </ColumnFlexSection>
              </Form>
            )}

            <UserListContainer>
              <List
                size="small"
                itemLayout="horizontal"
                dataSource={company.users}
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ProfileBadge user={user} />}
                      title={
                        <Typo fontSize="0.8rem">
                          {user.name || (
                            <Typo fontSize="0.75rem" code span>
                              unset
                            </Typo>
                          )}{" "}
                          ({user.email})
                        </Typo>
                      }
                      description={
                        <Typo fontSize="0.7rem" color="#aaa">
                          as {user.role} - {user.inviteStatus}
                        </Typo>
                      }
                    />
                  </List.Item>
                )}
              />
            </UserListContainer>
          </ColumnFlexSection>

          <Line />
          <ColumnFlexSection gap={2}>
            <Typo fontSize="0.75rem" color="#777">
              Support-ID:{" "}
              <Typo fontSize="0.7rem" code span>
                {company._id.slice(-6).toUpperCase()}
              </Typo>
            </Typo>
            <Typo fontSize="0.75rem" color="#777">
              Created at{" "}
              {moment(company.createdAt).local().format("YYYY-MM-DD")}
            </Typo>
          </ColumnFlexSection>
        </ColumnFlexSection>
      )}
    </>
  );
}

const UserListContainer = styled.div`
  max-height: 35vh;
  overflow: auto;
`;
