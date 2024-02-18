import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";


const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const config ={
    projectId:"dbfhkj94",
    dataset,
    apiVersion,
    useCdn:true,
};

export const sanityClient = createClient(config);
export const urlFor =(source)=> createImageUrlBuilder(config).image(source);