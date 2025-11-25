import { t } from "elysia";

export namespace WorkspaceModel {
  export const createWorkspaceBody = t.Object({
    name: t.String({ minLength: 3 }),
  });

  export type createWorkspaceBody = typeof createWorkspaceBody.static;

  export const createWorkspaceResponse = t.Object({
    id: t.String(),
    name: t.String(),
    createdAt: t.Date(),
  });

  export type createWorkspaceResponse = typeof createWorkspaceResponse.static;
}
