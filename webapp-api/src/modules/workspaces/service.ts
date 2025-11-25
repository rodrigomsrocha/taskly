import { eq } from "drizzle-orm";
import { db } from "../../lib/db";
import { workspaceMembers, workspaces } from "../../lib/db/schema";
import { WorkspaceModel } from "./model";

export abstract class Workspace {
  static async getUserWorkspaces(userId: string) {
    const userWorkspaces = await db
      .select()
      .from(workspaces)
      .innerJoin(
        workspaceMembers,
        eq(workspaceMembers.workspaceId, workspaces.id),
      )
      .where(eq(workspaceMembers.userId, userId));

    return userWorkspaces;
  }

  static async getUserWorkspace(userId: string, workspaceId: string) {
    const userWorkspaces = await this.getUserWorkspaces(userId);
    const userWorkspace = userWorkspaces.find(
      (workspace) => workspace.workspaces.id === workspaceId,
    );

    return userWorkspace;
  }

  static async createWorkspace(
    userId: string,
    body: WorkspaceModel.createWorkspaceBody,
  ) {
    const workspace = await db
      .insert(workspaces)
      .values({ name: body.name })
      .returning();

    await db
      .insert(workspaceMembers)
      .values({ userId, workspaceId: workspace[0].id, role: "owner" });

    return workspace[0];
  }
}
