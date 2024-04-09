import { createClient } from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = createClient({
    dataset: "production",
    projectId:"dbfhkj94",
    useCdn:true,
    token:process.env.SANITY_API_TOKEN,


})
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { _id, name, email, comment, parentId } = JSON.parse(req.body);
    try {
        if (parentId) {
            // Handle reply
            await client.create({
                _type: 'comment',
                post: {
                    _type: 'reference',
                    _ref: _id
                },
                parentComment: {
                    _type: 'reference',
                    _ref: parentId
                },
                name,
                email,
                comment
            });
        } else {
            // Handle regular comment
            await client.create({
                _type: 'comment',
                post: {
                    _type: 'reference',
                    _ref: _id
                },
                name,
                email,
                comment
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Could not submit comment", err });
    }
    console.log("Comment Submitted")
    return res.status(200).json({ message: 'Comment Submitted' });
}
