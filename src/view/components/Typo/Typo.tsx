import { SystemColor } from "configs/styles/colors";
import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface ITypoProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  fontSize?: number | string;
  bold?: boolean;
  italic?: boolean;
  padding?: string;
  margin?: string;
  color?: string;
  span?: boolean;
  code?: boolean;
  borderRadius?: string;
}

export default function Typo({ children, span, ...typoOptions }: ITypoProps) {
  return (
    <>
      {span ? (
        <SpanText {...typoOptions}>{children}</SpanText>
      ) : (
        <PText {...typoOptions}>{children}</PText>
      )}
    </>
  );
}

const PText = styled.p<{
  fontSize?: number | string;
  bold?: boolean;
  italic?: boolean;
  padding?: string;
  margin?: string;
  color?: string;
  code?: boolean;
  borderRadius?: string;
}>`
  padding: ${(props) => props.padding || 0};
  margin: ${(props) => props.margin || 0};
  color: ${(props) => props.color || SystemColor.Text};
  font-size: ${(props) =>
      props.fontSize
        ? typeof props.fontSize === "number"
          ? `${props.fontSize}px;`
          : `${props.fontSize};`
        : "1rem;"}
    ${(props) => props.bold && "font-weight: bold;"}
    ${(props) => props.italic && "font-style: italic;"};
  ${(props) =>
    props.code &&
    `
    background-color: ${SystemColor.Grey10};
    border-radius: 3px;
    padding: ${props.padding || "2px 4px"};
    `}
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}`}
`;

const SpanText = styled.span<{
  fontSize?: number | string;
  bold?: boolean;
  italic?: boolean;
  padding?: string;
  margin?: string;
  color?: string;
  code?: boolean;
  borderRadius?: string;
}>`
  padding: ${(props) => props.padding || 0};
  margin: ${(props) => props.margin || 0};
  color: ${(props) => props.color || SystemColor.Text};
  font-size: ${(props) =>
      props.fontSize
        ? typeof props.fontSize === "number"
          ? `${props.fontSize}px;`
          : `${props.fontSize};`
        : "1rem;"}
    ${(props) => props.bold && "font-weight: bold;"}
    ${(props) => props.italic && "font-style: italic;"}
    ${(props) =>
      props.code &&
      `
    background-color: ${SystemColor.Grey10};
    border-radius: 3px;
    padding: ${props.padding || "2px 4px"};
    `};
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}`}
`;
