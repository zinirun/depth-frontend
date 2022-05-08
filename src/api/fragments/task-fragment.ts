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
    }
    title
    content
    isTopDepth
    involvedUsers {
      _id
      name
      email
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
