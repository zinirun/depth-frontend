import gql from "graphql-tag";

export const TaskFragment = gql`
  fragment TaskChildren on Task {
    _id
    project {
      _id
      title
    }
    author {
      _id
      name
      email
      emoji
    }
    title
    content
    isTopDepth
    involvedUsers {
      _id
      name
      email
      emoji
    }
    deadline {
      from
      to
    }
    comments {
      _id
      author {
        _id
        name
        email
        emoji
      }
      content
      createdAt
      updatedAt
    }
    status
    createdAt
    updatedAt
  }
`;
