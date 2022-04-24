import gql from "graphql-tag";

export const TaskCommentFragment = gql`
  fragment TaskCommentFragment on TaskComment {
    _id
    author {
      _id
      name
      email
    }
    content
  }
`;
