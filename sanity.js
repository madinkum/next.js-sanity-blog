import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

const projectId =process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =process.env.NEXT_PUBLIC_SANITY_DATASET;

export const config ={
    projectId,
    dataset,
    apiVersion:"2024-02-15",
    useCdn:true,
};

export const sanityClient = createClient(config);
export const urlFor =(source)=> createImageUrlBuilder(config).image(source);
