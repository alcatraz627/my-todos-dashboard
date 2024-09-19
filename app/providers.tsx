"use client";
import { getQueryClient } from "@/src/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
