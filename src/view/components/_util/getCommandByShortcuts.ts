interface IShortcutOption {
  key?: string;
  code?: string;
  command: string;
  withCmdOrCtrl?: boolean;
  withOptOrAlt?: boolean;
}

const getCommandByShortcuts = <T>(
  event: React.KeyboardEvent<T>,
  shortcuts: IShortcutOption[]
): string | void => {
  const { key, code, ctrlKey, metaKey, altKey: isWithOptOrAlt } = event;
  const isWithCmdOrCtrl = ctrlKey || metaKey;
  for (const shortcut of shortcuts) {
    if (key === shortcut.key || code === shortcut.code) {
      if (!shortcut.withCmdOrCtrl && !shortcut.withOptOrAlt) {
        return shortcut.command;
      } else if (
        shortcut.withCmdOrCtrl &&
        shortcut.withOptOrAlt &&
        isWithCmdOrCtrl &&
        isWithOptOrAlt
      ) {
        return shortcut.command;
      } else if (shortcut.withCmdOrCtrl && isWithCmdOrCtrl) {
        return shortcut.command;
      } else if (shortcut.withOptOrAlt && isWithOptOrAlt) {
        return shortcut.command;
      }
    }
  }
};

export default getCommandByShortcuts;
