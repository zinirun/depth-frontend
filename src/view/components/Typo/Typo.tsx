import { SystemColor } from "configs/styles/colors";
import React from "react";
import styled from "styled-components";

interface ITypoProps {
  children?: React.ReactNode;
  fontSize?: number | string;
  bold?: boolean;
  italic?: boolean;
  padding?: string;
  margin?: string;
  color?: string;
}

export default function Typo({ children, ...typoOptions }: ITypoProps) {
  return <Text {...typoOptions}>{children}</Text>;
}

const Text = styled.p<{
  fontSize?: number | string;
  bold?: boolean;
  italic?: boolean;
  padding?: string;
  margin?: string;
  color?: string;
}>`
  padding: ${(props) => props.padding || 0};
  margin: ${(props) => props.margin || 0};
  font-size: ${(props) =>
      props.fontSize
        ? typeof props.fontSize === "number"
          ? `${props.fontSize}px;`
          : `${props.fontSize};`
        : "1rem;"}
    ${(props) => props.bold && "font-weight: bold;"}
    ${(props) => props.italic && "font-style: italic;"};
  color: ${(props) => props.color || SystemColor.Text};
`;
