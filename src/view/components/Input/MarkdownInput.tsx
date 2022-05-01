import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import styled from "styled-components";
import ColumnFlexSection from "../Layout/ColumnFlexSection";
import Typo from "../Typo/Typo";

interface IMarkdownInputProps {
  value?: string;
  onChange?: (value?: string) => any;
}

export default function MarkdownInput({
  value,
  onChange,
}: IMarkdownInputProps) {
  const [visibleEditor, setVisibleEditor] = useState<boolean>(false);
  const handleChange = (value?: string) => {
    onChange && onChange(value);
  };
  const handleSwitchVisible = () => setVisibleEditor((prev) => !prev);
  return (
    <Container>
      {visibleEditor ? (
        <ColumnFlexSection>
          <MDEditor
            className="markdown-editor"
            value={value}
            onChange={handleChange}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
              className: "markdown-preview",
            }}
            height={window.innerHeight / 2 - 40}
            autoFocus
          />
          <Typo
            padding="12px 0 0"
            fontSize="0.75rem"
            color="#aaa"
            onClick={handleSwitchVisible}
          >
            <Typo span code fontSize="0.675rem">
              Click
            </Typo>{" "}
            to view content
          </Typo>
        </ColumnFlexSection>
      ) : (
        <PreviewContainer onClick={handleSwitchVisible}>
          {value && value.trim().length > 1 ? (
            <MDEditor.Markdown
              source={value}
              rehypePlugins={[[rehypeSanitize]]}
              className="markdown-content"
            />
          ) : (
            <Typo fontSize="0.75rem" color="#aaa">
              <Typo span code fontSize="0.675rem">
                Click
              </Typo>{" "}
              to write content
            </Typo>
          )}
        </PreviewContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  .markdown-preview p,
  li,
  ul,
  div,
  a {
    font-size: 0.9rem;
  }
  .markdown-content {
    height: 100%;
  }
  .markdown-content p,
  li,
  ul,
  div,
  a {
    font-size: 0.9rem;
  }
`;

const PreviewContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
