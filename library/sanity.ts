import {  createClient } from "next-sanity";



const config={
    projectId:"dbfhkj94",
    dataset:"production",
    apiVersion:"2024-02-15",
    useCdn:true,
};

const client = createClient(config);
export default client;