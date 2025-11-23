import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authRouter } from "./modules/auth";
import openapi from "@elysiajs/openapi";
import { OpenAPI } from "./lib/auth";

const app = new Elysia({ prefix: "/api" })
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .use(authRouter)
  .get("/user", ({ user }) => user, { auth: true })
  .use(cors())
  .listen(3001);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
