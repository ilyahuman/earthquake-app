"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/apollo/apolloClient";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AppProvider;
