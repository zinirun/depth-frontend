import { TaskTreeFragment } from "api/fragments/task-tree-fragment";
import gql from "graphql-tag";

export const TASK_TREE = gql`
  ${TaskTreeFragment}
  query taskTree($projectId: ID!) {
    taskTree(projectId: $projectId) {
      ...TaskTreeChildren
      children {
        ...TaskTreeChildren
        children {
          ...TaskTreeChildren
          children {
            ...TaskTreeChildren
            children {
              ...TaskTreeChildren
              children {
                ...TaskTreeChildren
                children {
                  ...TaskTreeChildren
                  children {
                    ...TaskTreeChildren
                    children {
                      ...TaskTreeChildren
                      children {
                        ...TaskTreeChildren
                        children {
                          ...TaskTreeChildren
                          children {
                            ...TaskTreeChildren
                            children {
                              ...TaskTreeChildren
                              children {
                                ...TaskTreeChildren
                                children {
                                  ...TaskTreeChildren
                                  children {
                                    ...TaskTreeChildren
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
