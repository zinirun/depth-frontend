import { TaskCommentFragment } from "api/fragments/task-comment-fragment";
import gql from "graphql-tag";

export interface IUpdateTaskCommentInput {
  id: string;
  content: string;
}

export const UPDATE_TASK_COMMENT = gql`
  ${TaskCommentFragment}
  mutation UpdateTaskComment($comment: UpdateTaskCommentInput!) {
    updateTaskComment(comment: $comment) {
      ...TaskCommentFragment
    }
  }
`;
