import gql from "graphql-tag";
import { TaskFragment } from "api/fragments/task-fragment";

export const MY_TASKS = gql`
  ${TaskFragment}
  query MyTasks {
    myTasks {
      today {
        ...TaskChildren
      }
      thisWeek {
        ...TaskChildren
      }
      recent {
        ...TaskChildren
      }
    }
  }
`;
