import { ClientConfig, createClient } from "next-sanity";


const projectId =process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =process.env.NEXT_PUBLIC_SANITY_DATASET ;

const config={
    projectId,
    dataset,
    apiVersion:"2024-02-15",
    useCdn:true,
};

const client = createClient(config);
export default client;