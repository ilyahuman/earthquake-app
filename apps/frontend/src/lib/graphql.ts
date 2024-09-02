import { GraphQLClient, RequestDocument } from "graphql-request";

const endpoint = "http://localhost:8080/graphql";

const graphQLClient = new GraphQLClient(endpoint);

export const fetchGraphQLData = async <T = any>(
  query: RequestDocument,
  variables: Record<string, any> = {},
): Promise<T> => {
  try {
    return await graphQLClient.request<T>(query, variables);
  } catch (error) {
    console.error("GraphQL request failed", error);
    throw new Error("Failed to fetch data from GraphQL API");
  }
};
