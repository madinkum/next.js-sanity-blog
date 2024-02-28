import { createClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'


const client = createClient({
    dataset: "production",
    projectId:"00t91dbd",
    useCdn:true,
    apiVersion: "2023-12-06",
    token:process.env.SANITY_API_TOKEN,


})
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body)
  const {_id,name,email,comment} = (req.body)
  
 
    try{
      await client.create({
          _type: "comment",
          post:{
              _type: "reference",
              _ref: _id
          },
          name,
          email,
          comment
      });
    }catch(err){
        return res.status(500).json({message: "Could not submit comment", err});
    }
    console.log("Comment Submitted")
  return res.status(200).json({ message: 'Comment Submitted' });

}
    
