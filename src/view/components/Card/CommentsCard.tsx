import { Form, Input } from "antd";
import { ITaskComment } from "configs/interfaces/common/task-comment.interface";
import styled from "styled-components";
import { ProfileBadge } from "../Badge/ProfileBadge";
import RowFlexSection from "../Layout/RowFlexSection";
import Typo from "../Typo/Typo";
import { ReactComponent as CommentAddIcon } from "assets/common/CommentAddIcon.svg";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_TASK_COMMENT,
  ICreateTaskCommentInput,
} from "api/mutations/create-task-comment";
import errorLogger from "util/logger/error-logger";
import { useEffect, useRef, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import useUser from "util/hooks/useUser";
import { IUser } from "configs/interfaces/common/user.interface";

interface ICommentsCardProps {
  taskId: string;
  refetch?: () => Promise<void>;
  comments: ITaskComment[];
}

export default function CommentsCard({
  comments: originalComments,
  taskId,
  refetch,
}: ICommentsCardProps) {
  const { user } = useUser();
  const [comments, setComments] = useState<ITaskComment[]>(originalComments);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [comments]);
  const handleAfterCreate = async (content: string) => {
    refetch && (await refetch());
    // TODO: Set comments before refetch
    setComments([
      ...comments,
      {
        _id: "",
        author: user as IUser,
        content,
      },
    ]);
  };
  return (
    <Container>
      <Typo fontSize="0.7rem" color="#aaa" padding="0 0 8px">
        {comments?.length || "no"} comments
      </Typo>
      <CommentContainer ref={containerRef}>
        {comments.map((comment, idx) => (
          <RowFlexSection
            className="task-comment"
            key={`tc-${idx}`}
            alignItems="center"
            justifyContent="flex-start"
            gap={8}
          >
            <ProfileBadge user={comment.author} />
            <Typo fontSize="0.75rem">{comment.content}</Typo>
          </RowFlexSection>
        ))}
      </CommentContainer>
      <CreateCommentBox taskId={taskId} afterCreate={handleAfterCreate} />
    </Container>
  );
}

export function CreateCommentBox({
  taskId,
  afterCreate,
}: {
  taskId: string;
  afterCreate?: (content: string) => any;
}) {
  const [form] = useForm<{ content: string }>();
  const [createComment] = useMutation<
    { createTaskComment: ITaskComment },
    {
      comment: ICreateTaskCommentInput;
    }
  >(CREATE_TASK_COMMENT);
  const handleSubmit = async ({ content }: { content: string }) => {
    if (!content) return;
    try {
      await createComment({
        variables: {
          comment: {
            taskId,
            content,
          },
        },
      });
      form.resetFields();
      afterCreate && afterCreate(content);
    } catch (err) {
      errorLogger(
        new Error(`cannot create task comment: ${(err as Error).message}`)
      );
    }
  };
  return (
    <Form onFinish={handleSubmit} form={form}>
      <RowFlexSection padding="8px 0 0">
        <Form.Item
          name="content"
          rules={[{ required: true, message: "Provide any words" }]}
          noStyle
        >
          <Input
            suffix={
              <CreateCommentButton onClick={() => form.submit()}>
                <CommentAddIcon />
              </CreateCommentButton>
            }
          />
        </Form.Item>
      </RowFlexSection>
    </Form>
  );
}

const Container = styled.div``;

const CommentContainer = styled.div`
  max-height: 200px;
  overflow: auto;
  padding: 0 0 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CreateCommentButton = styled.span`
  cursor: pointer;
`;
