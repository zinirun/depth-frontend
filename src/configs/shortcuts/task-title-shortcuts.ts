export enum TaskTitleCommand {
  AssignMembers = "ASSIGN_MEMBER",
  SetDeadline = "SET_DEADLINE",
  IncreaseDepth = "INCREASE_DEPTH",
  NewTaskInSameDepth = "NEW_TASK_IN_SAME_DEPTH",
  NewTaskInNewDepth = "NEW_TASK_IN_NEW_DEPTH",
  JumpPrevious = "JUMP_PREVIOUS",
  JumpNext = "JUMP_NEXT",
  Fold = "FOLD",
  Unfold = "UNFOLD",
  TogglePreviousStatus = "TOGGLE_PREVIOUS_STATUS",
  ToggleNextStatus = "TOGGLE_NEXT_STATUS",
  SetViewFocus = "SET_VIEW_FOCUS",
  ViewDetail = "VIEW_DETAIL",
  CloseMenu = "CLOSE_MENU",
  DeleteTaskIfInputEmpty = "DELETE_TASK",
}
export const TaskTitleShortcuts = [
  {
    key: "@",
    command: TaskTitleCommand.AssignMembers,
  },
  {
    key: "$",
    command: TaskTitleCommand.SetDeadline,
  },
  {
    key: "Escape",
    command: TaskTitleCommand.CloseMenu,
  },
  // {
  //   key: "Tab",
  //   command: TaskTitleCommand.IncreaseDepth,
  // },
  {
    key: "ArrowUp",
    command: TaskTitleCommand.Fold,
    withCmdOrCtrl: true,
  },
  {
    key: "ArrowDown",
    command: TaskTitleCommand.Unfold,
    withCmdOrCtrl: true,
  },
  {
    key: "ArrowLeft",
    command: TaskTitleCommand.TogglePreviousStatus,
    withCmdOrCtrl: true,
  },
  {
    key: "ArrowRight",
    command: TaskTitleCommand.ToggleNextStatus,
    withCmdOrCtrl: true,
  },
  {
    key: "Enter",
    command: TaskTitleCommand.NewTaskInNewDepth,
    withCmdOrCtrl: true,
  },
  {
    key: "Enter",
    command: TaskTitleCommand.NewTaskInSameDepth,
  },
  {
    code: "KeyV",
    command: TaskTitleCommand.SetViewFocus,
    withOptOrAlt: true,
  },
  {
    key: "ArrowDown",
    command: TaskTitleCommand.JumpNext,
  },
  {
    key: "ArrowUp",
    command: TaskTitleCommand.JumpPrevious,
  },
  {
    key: "d",
    command: TaskTitleCommand.ViewDetail,
    withCmdOrCtrl: true,
  },
  {
    key: "Backspace",
    command: TaskTitleCommand.DeleteTaskIfInputEmpty,
  },
];
