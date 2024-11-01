import { Form, Input, message, Popover } from "antd";
import moment from "moment";
import { useState } from "react";
import useUser from "util/hooks/useUser";
import Button from "view/components/Button";
import ColumnFlexSection from "view/components/Layout/ColumnFlexSection";
import RowFlexSection from "view/components/Layout/RowFlexSection";
import Line from "view/components/Line";
import Typo from "view/components/Typo/Typo";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import { RoundProfileBadge } from "view/components/Badge/ProfileBadge";

export default function UserContainer() {
  const { user, update } = useUser();
  const [canUpdate, setCanUpdate] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      if (value === user?.name) {
        setCanUpdate(false);
      } else {
        setCanUpdate(true);
      }
    }
  };
  const handleSubmit = async ({ name }: { name: string }) => {
    const user = await update({ name });
    if (user) {
      setCanUpdate(false);
      message.success("Saved successfully");
    }
  };

  const [chosenEmoji, setChosenEmoji] = useState<string>();
  const handleChangeEmoji = (
    _: React.MouseEvent<Element, MouseEvent>,
    { emoji }: IEmojiData
  ) => {
    setChosenEmoji(emoji);
    update({
      emoji,
    });
    message.success(`Your emoji ${emoji} saved successfully`);
  };
  return (
    <>
      {user && (
        <Form onFinish={handleSubmit}>
          <ColumnFlexSection gap={16}>
            <ColumnFlexSection gap={6}>
              <RowFlexSection>
                <Popover
                  title={<EmojiPicker onEmojiClick={handleChangeEmoji} />}
                  trigger={"click"}
                >
                  <div>
                    <RoundProfileBadge
                      user={{
                        emoji: chosenEmoji || user.emoji,
                        name: user.name,
                        email: user.email,
                      }}
                      size="large"
                      bordered={!!(chosenEmoji || user.emoji)}
                      pointer
                    />
                  </div>
                </Popover>
              </RowFlexSection>
              <RowFlexSection justifyContent="space-between">
                <Typo fontSize="0.85rem">Name</Typo>
                <Button size="small" type="submit" disabled={!canUpdate}>
                  Save
                </Button>
              </RowFlexSection>
              <Form.Item
                name="name"
                initialValue={user.name}
                rules={[{ required: true }]}
                noStyle
              >
                <Input name="name" onChange={handleChange} />
              </Form.Item>
            </ColumnFlexSection>

            <ColumnFlexSection gap={6}>
              <Typo fontSize="0.85rem">Email</Typo>
              <Input value={user.email} readOnly />
            </ColumnFlexSection>

            <ColumnFlexSection gap={6}>
              <Typo fontSize="0.85rem">Role</Typo>
              <Input value={user.role} readOnly />
            </ColumnFlexSection>

            <Line />
            <ColumnFlexSection gap={2}>
              <Typo fontSize="0.75rem" color="#777">
                Authorization with {user.authType} ({user.inviteStatus})
              </Typo>
              <Typo fontSize="0.75rem" color="#777">
                Created at{" "}
                {moment(user.createdAt).local().format("YYYY-MM-DD HH:mm")}
              </Typo>
            </ColumnFlexSection>
          </ColumnFlexSection>
        </Form>
      )}
    </>
  );
}
