import { TaskFragment } from "api/fragments/task-fragment";
import gql from "graphql-tag";

export const TASK = gql`
  ${TaskFragment}
  query task($id: ID!) {
    task(id: $id) {
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
        }
      }
    }
  }
`;
