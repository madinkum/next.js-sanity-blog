import { defineConfig } from "sanity";
import { schemaTypes } from "./schemas";
import { deskTool } from "sanity/desk";
import {visionTool} from '@sanity/vision'
export default defineConfig({
  name: "default",
  title: "Sanity Next.js Blog",

  projectId: "00t91dbd",
  dataset: "production",
  basePath: "/studio",

  plugins: [deskTool(),visionTool()],

  schema: {
    types: schemaTypes,
  },
});
