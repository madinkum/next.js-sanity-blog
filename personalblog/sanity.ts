import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config ={
    projectId:"dbfhkj94",
    dataset:"production",
    apiVersion:"2024-02-15",
    useCdn:true,
};

export const sanityClient = createClient(config);
export const urlFor =(source:any)=> createImageUrlBuilder(config).image(source);