import { TaskFragment } from "api/fragments/task-fragment";
import gql from "graphql-tag";

export const TASKS_BY_PROJECT_ID = gql`
  ${TaskFragment}
  query TasksByProjectId($projectId: ID!) {
    tasksByProjectId(projectId: $projectId) {
      ...TaskChildren
      children {
        ...TaskChildren
        children {
          ...TaskChildren
          children {
            ...TaskChildren
            children {
              ...TaskChildren
              children {
                ...TaskChildren
                children {
                  ...TaskChildren
                  children {
                    ...TaskChildren
                    children {
                      ...TaskChildren
                      children {
                        ...TaskChildren
                        children {
                          ...TaskChildren
                          children {
                            ...TaskChildren
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
