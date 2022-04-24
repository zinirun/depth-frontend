export default function omitTypename(graphQLObject: any) {
  if (!graphQLObject) {
    return undefined;
  }
  const { __typename, ...rest } = graphQLObject;
  return rest;
}
