import { TaskTitleShortcuts } from "configs/shortcuts/task-title-shortcuts";
import { Fragment } from "react";
import styled from "styled-components";
import RowFlexSection from "../Layout/RowFlexSection";
import Line from "../Line";

const replaceKey = (key: string) =>
  key
    .replace("ArrowLeft", "←")
    .replace("ArrowRight", "→")
    .replace("Escape", "ESC")
    .replace("Key", "");

const ShortcutGuide = () => {
  return (
    <Container>
      {TaskTitleShortcuts.map(
        ({ key, withCmdOrCtrl, withOptOrAlt, code, command }, index) => (
          <Fragment key={index}>
            <RowFlexSection>
              <Key>
                {withOptOrAlt && <Code>Opt/Alt</Code>}
                {withCmdOrCtrl && <Code>Cmd/Ctrl</Code>}
                {key && <Code>{replaceKey(key)}</Code>}
                {code && <Code>{replaceKey(code)}</Code>}
              </Key>
              <Command>{command}</Command>
            </RowFlexSection>
            <Line />
          </Fragment>
        )
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 0.75rem;
  color: #777;
  width: 320px;
`;

const Key = styled.div`
  flex: 1;
`;

const Command = styled.div`
  flex: 2;
`;

const Code = styled.span`
  font-size: 0.65rem;
  padding: 3px 4px;
  border-radius: 4px;
  color: white;
  background-color: #888;
  margin-right: 4px;
`;

export default ShortcutGuide;
