import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./personalblog/schemaTypes";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  basePath:"/studio",
  name: "default",
  title: "personalblog",

  projectId: "dbfhkj94",
  dataset: "production",

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
