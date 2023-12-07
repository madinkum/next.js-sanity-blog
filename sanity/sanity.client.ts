// sanity/sanity.client.ts

import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "00t91dbd",
  dataset: "production",
  apiVersion: "2023-12-06",
  useCdn: false,
};

const client = createClient(config);

export default client;