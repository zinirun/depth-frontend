import { Dropdown, Form, Input, Menu } from "antd";
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
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import useUser from "util/hooks/useUser";
import moment from "moment";
import Line from "../Line";
import ColumnFlexSection from "../Layout/ColumnFlexSection";
import { ReactComponent as CommentIcon } from "assets/common/CommentIcon.svg";
import { ReactComponent as EditIcon } from "assets/common/EditIcon.svg";
import { SystemColor } from "configs/styles/colors";
import IconButton from "../Button/IconButton";
import {
  IUpdateTaskCommentInput,
  UPDATE_TASK_COMMENT,
} from "api/mutations/update-task-comment";
import { DELETE_TASK_COMMENT } from "api/mutations/delete-task-comment";
import { IUser } from "configs/interfaces/common/user.interface";

interface ICommentsCardProps {
  taskId: string;
  refetch?: () => Promise<void>;
  comments: ITaskComment[];
}

export default function CommentsCard({
  comments,
  taskId,
  refetch,
}: ICommentsCardProps) {
  const { user: me } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);
  const [updateComment] = useMutation<
    { updateTaskComment: ITaskComment },
    { comment: IUpdateTaskCommentInput }
  >(UPDATE_TASK_COMMENT);
  const [deleteComment] = useMutation<
    { deleteTaskComment: string },
    { id: string }
  >(DELETE_TASK_COMMENT);

  const scrollToBottom = () => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight;
      if (scrollHeight) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const handleRefetch = async () => {
    refetch && (await refetch());
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComment({ variables: { id } });
      await handleRefetch();
    } catch (err) {
      errorLogger(err as Error);
    }
  };

  return (
    <Container>
      <RowFlexSection padding="0 0 8px" justifyContent="flex-start">
        <CommentIcon width={18} height={18} />
        <Typo color="#aaa" fontSize="0.65rem">
          {comments.length}
        </Typo>
      </RowFlexSection>
      <CommentContainer ref={containerRef}>
        {comments.map((comment, idx) => (
          <Fragment key={`tc-${idx}`}>
            <Comment comment={comment} me={me} handleDelete={handleDelete} />
            {idx !== comments.length - 1 && <Line />}
          </Fragment>
        ))}
      </CommentContainer>
      <CreateCommentBox taskId={taskId} afterCreate={handleRefetch} />
    </Container>
  );
}

interface ICommentProps {
  comment: ITaskComment;
  me?: IUser;
  handleDelete: (id: string) => Promise<void>;
}

function Comment({ comment, me, handleDelete }: ICommentProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ColumnFlexSection>
      <RowFlexSection
        className="task-comment"
        alignItems="center"
        justifyContent="flex-start"
        gap={8}
      >
        <ProfileBadge user={comment.author} />
        {isEditing ? (
          <Form>
            <Form.Item name="content" initialValue={comment.content} noStyle>
              <Input size="small" />
            </Form.Item>
          </Form>
        ) : (
          <Typo fontSize="0.75rem">{comment.content}</Typo>
        )}
      </RowFlexSection>
      <RowFlexSection justifyContent="flex-end" gap={3}>
        {me && me._id === comment.author._id && (
          <Dropdown
            overlay={() =>
              MyCommentOverlay({
                id: comment._id,
                handleDelete: () => handleDelete(comment._id),
                handleSetEditing: () => setIsEditing(true),
              })
            }
            trigger={["click"]}
          >
            <IconButton>
              <EditIcon width={16} height={16} />
            </IconButton>
          </Dropdown>
        )}
        {comment.createdAt && (
          <Typo fontSize="0.6rem" color="#aaa">
            {moment(comment.createdAt).local().format("YY/MM/DD HH:mm")}
          </Typo>
        )}
      </RowFlexSection>
    </ColumnFlexSection>
  );
}

function CreateCommentBox({
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
    <CreateCommentContainer>
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
    </CreateCommentContainer>
  );
}

interface IMyCommentOverlayProps {
  id: string;
  handleDelete: (id: string) => Promise<void>;
  handleSetEditing: () => void;
}

const MyCommentOverlay = ({
  id,
  handleDelete,
  handleSetEditing,
}: IMyCommentOverlayProps) => {
  return (
    <Menu
      items={
        [
          // {
          //   label: (
          //     <Typo fontSize="0.8rem" onClick={handleSetEditing}>
          //       Edit
          //     </Typo>
          //   ),
          // },
          {
            label: (
              <Typo
                fontSize="0.8rem"
                color={SystemColor.Error}
                onClick={() => handleDelete(id)}
              >
                Delete
              </Typo>
            ),
          },
        ] as any
      }
    />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentContainer = styled.div`
  padding: 0 0 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: calc(100vh - (50vh + 210px));
  overflow: auto;
`;

const CreateCommentContainer = styled.div``;

const CreateCommentButton = styled.span`
  cursor: pointer;
`;
