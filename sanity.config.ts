import { defineConfig } from "sanity";
import { schemaTypes } from "./schemas";
import { deskTool } from "sanity/desk";

export default defineConfig({
  name: "default",
  title: "Sanity Next.js Blog",

  projectId: "00t91dbd",
  dataset: "production",
  basePath: "/studio",

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
