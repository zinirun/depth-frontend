import styled from "styled-components";

export default function IconButton({
  onClick,
  children,
  hoverColor = "#bbb",
}: {
  onClick?: () => any;
  children: React.ReactNode;
  hoverColor?: string;
}) {
  return (
    <Button onClick={onClick} hoverColor={hoverColor}>
      {children}
    </Button>
  );
}
const Button = styled.span<{ hoverColor: string }>`
  cursor: pointer;
  svg > path {
    transition: 0.4s all;
  }
  :hover svg > * {
    stroke: ${(props) => props.hoverColor};
  }
`;
