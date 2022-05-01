export enum TaskTitleCommand {
  AssignMembers = "Assign members",
  SetDeadline = "Set deadline",
  // IncreaseDepth = "INCREASE_DEPTH",
  NewTaskInSameDepth = "Create new task in same depth",
  NewTaskInNewDepth = "Create new task in new depth",
  // JumpPrevious = "JUMP_PREVIOUS",
  // JumpNext = "JUMP_NEXT",
  // Fold = "FOLD",
  // Unfold = "UNFOLD",
  TogglePreviousStatus = "Toggle task status to previous",
  ToggleNextStatus = "Toggle task status to next",
  SetViewFocus = "Set view focus to this task",
  ViewDetail = "View detail of this task",
  CloseMenu = "Close menu",
  DeleteTaskIfInputEmpty = "Delete this task",
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
  // {
  //   key: "Tab",
  //   command: TaskTitleCommand.IncreaseDepth,
  // },
  // {
  //   key: "ArrowUp",
  //   command: TaskTitleCommand.Fold,
  //   withCmdOrCtrl: true,
  // },
  // {
  //   key: "ArrowDown",
  //   command: TaskTitleCommand.Unfold,
  //   withCmdOrCtrl: true,
  // },
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
  // {
  //   key: "ArrowDown",
  //   command: TaskTitleCommand.JumpNext,
  // },
  // {
  //   key: "ArrowUp",
  //   command: TaskTitleCommand.JumpPrevious,
  // },
  {
    key: "d",
    command: TaskTitleCommand.ViewDetail,
    withCmdOrCtrl: true,
  },
  {
    key: "Backspace",
    command: TaskTitleCommand.DeleteTaskIfInputEmpty,
  },
  {
    key: "Escape",
    command: TaskTitleCommand.CloseMenu,
  },
];
