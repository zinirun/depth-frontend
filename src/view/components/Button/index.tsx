import styled from "styled-components";
import RowFlexSection from "../Layout/RowFlexSection";
import { SystemColor } from "configs/styles/colors";
import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  block?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  borderless?: boolean;
  fontSize?: string | number;
  hoverBlueOutline?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  onClick,
  children,
  block,
  icon,
  borderless,
  fontSize,
  hoverBlueOutline,
  type,
  ...rest
}: IButtonProps) {
  return (
    <NormalButton
      {...rest}
      onClick={onClick ? onClick : () => {}}
      block={block}
      borderless={borderless}
      fontSize={fontSize}
      hoverBlueOutline={hoverBlueOutline}
      type={type}
    >
      {icon ? (
        <RowFlexSection gap={3}>
          {icon}
          {children}
        </RowFlexSection>
      ) : (
        children
      )}
    </NormalButton>
  );
}

interface IDivButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  cursor?: string;
  padding?: string;
  height?: number;
  icon?: React.ReactNode;
  hoverBackground?: string;
  block?: boolean;
  children?: React.ReactNode;
}

export function TransparentButton({
  onClick,
  block,
  children,
  icon,
  hoverBackground,
  cursor,
  height,
  padding,
}: IDivButtonProps) {
  return (
    <TransparentBox
      onClick={onClick ? onClick : () => {}}
      block={block}
      hoverBackground={hoverBackground}
      cursor={cursor}
      height={height}
      padding={padding}
    >
      {icon ? (
        <RowFlexSection gap={3}>
          {children}
          {icon}
        </RowFlexSection>
      ) : (
        children
      )}
    </TransparentBox>
  );
}

const NormalButton = styled.button<{
  block?: boolean;
  borderless?: boolean;
  fontSize?: string | number;
  hoverBlueOutline?: boolean;
}>`
  color: ${SystemColor.Text};
  border: ${(props) =>
    props.borderless ? "none" : "1px solid rgba(15, 15, 15, 0.15)"};
  border-radius: 5px;
  padding: 7px 10px;
  font-size: 0.9rem;
  background-color: white;
  box-shadow: rgb(15 15 15 / 5%) 0px 1px 2px;
  cursor: pointer;
  ${(props) => props.block && "width: 100%;"}
  ${(props) =>
    props.fontSize &&
    (typeof props.fontSize === "number"
      ? `font-size: ${props.fontSize}px;`
      : `font-size: ${props.fontSize};`)}
  ${(props) =>
    props.hoverBlueOutline &&
    `
  :hover {
    outline: 1px solid ${SystemColor.Blue50};
  }`}
`;

const TransparentBox = styled.div<{
  block?: boolean;
  cursor?: string;
  hoverBackground?: string;
  padding?: string;
  height?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  background-color: transparent;
  ${(props) => props.cursor && `cursor: ${props.cursor};`}
  ${(props) => props.padding && `padding: ${props.padding};`}
  ${(props) => props.height && `height: ${props.height}px;`}
  ${(props) => props.block && "width: 100%;"}
  &:hover {
    ${(props) =>
      props.hoverBackground && `background: ${props.hoverBackground};`}
  }
`;
