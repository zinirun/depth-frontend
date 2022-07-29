import gql from "graphql-tag";

export const TaskMetaFragment = gql`
  fragment TaskMetaChildren on TaskMeta {
    _id
    project {
      _id
    }
    author {
      _id
      name
      email
      emoji
    }
    title
    # content
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
    status
    createdAt
  }
`;
