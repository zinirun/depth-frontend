function getSizeByProp(
  propSize: string | number | undefined,
  defaultSize: string | number = "auto"
) {
  if (propSize) {
    return typeof propSize === "string" ? propSize : `${propSize}px`;
  }
  return typeof defaultSize === "string" ? defaultSize : `${defaultSize}px`;
}

export default getSizeByProp;
