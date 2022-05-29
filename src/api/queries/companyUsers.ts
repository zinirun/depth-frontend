import gql from "graphql-tag";

export const COMPANY_USERS = gql`
  query CompanyUsers {
    companyUsers {
      _id
      email
      name
      emoji
      role
      createdAt
      updatedAt
    }
  }
`;
