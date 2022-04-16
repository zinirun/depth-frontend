import React from "react";
import styled from "styled-components";

interface ITitleProps {
  children?: React.ReactNode;
  bold?: boolean;
}

export default function Title({ children, bold }: ITitleProps) {
  return <TitleText bold={bold}>{children}</TitleText>;
}

const TitleText = styled.p<{ bold?: boolean }>`
  font-size: 2.5rem;
  ${(props) => props.bold && "font-weight: bold;"}
`;
