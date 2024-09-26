import { isServer, QueryClient } from "@tanstack/react-query";

export const AppQueryKeys = {
  tasks: ["tasks"],
  taskGroups: ["taskGroups"],
};

const MutationActions = {
  create: "create",
  update: "update",
  delete: "delete",
};

export const AppMutationKeys = {
  tasks: {
    create: (id: string = "any") => [
      AppQueryKeys.tasks[0],
      MutationActions.create,
      id,
    ],
    update: (id: string = "any") => [
      AppQueryKeys.tasks[0],
      MutationActions.update,
      id,
    ],
    delete: (id: string = "any") => [
      AppQueryKeys.tasks[0],
      MutationActions.delete,
      id,
    ],
  },
  taskGroups: {
    create: (id: string = "any") => [
      AppQueryKeys.taskGroups[0],
      MutationActions.create,
      id,
    ],
    update: (id: string = "any") => [
      AppQueryKeys.taskGroups[0],
      MutationActions.update,
      id,
    ],
    delete: (id: string = "any") => [
      AppQueryKeys.taskGroups[0],
      MutationActions.delete,
      id,
    ],
  },
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60,
        refetchOnMount: "always",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
