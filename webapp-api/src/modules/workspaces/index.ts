import Elysia, { NotFoundError } from "elysia";
import { authRouter } from "../auth";
import { Workspace } from "./service";
import { WorkspaceModel } from "./model";

export const workspaceRouter = new Elysia({
  prefix: "/workspaces",
  detail: { tags: ["Workspace"] },
})
  .use(authRouter)
  .get(
    "/",
    async ({ user }) => {
      const userWorkspaces = await Workspace.getUserWorkspaces(user.id);

      return userWorkspaces;
    },
    {
      auth: true,
      detail: {
        summary: "Get user workspaces",
        description:
          "Get a list of workspaces associated with the authenticated user.",
      },
    },
  )
  .get(
    "/:id",
    async ({ user, params }) => {
      const workspace = await Workspace.getUserWorkspace(user.id, params.id);

      if (!workspace) {
        throw new NotFoundError("Workspace not found");
      }

      return workspace;
    },
    {
      auth: true,
      detail: {
        summary: "Get workspace details",
        description: "Get details of a specific workspace.",
      },
    },
  )
  .post(
    "/",
    async ({ user, body }) => {
      const workspace = await Workspace.createWorkspace(user.id, body);

      return workspace;
    },
    {
      auth: true,
      body: WorkspaceModel.createWorkspaceBody,
      response: { 200: WorkspaceModel.createWorkspaceResponse },
      detail: {
        summary: "Create a new workspace",
        description: "Create a new workspace for the authenticated user.",
      },
    },
  );
