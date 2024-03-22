// pages/api/createReply.ts

import { createClient } from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = createClient({
  dataset: 'production',
  projectId: 'dbfhkj94', 
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

export default async function createReply(req: NextApiRequest, res: NextApiResponse) {
  const { commentId, name, email, reply } = req.body;

  try {
    // Check if the user has already posted 5 replies to this comment
    const existingReplies = await client.fetch(`*[_type == "reply" && comment._ref == $commentId && name == $name]`, {
      commentId,
      name,
    });
    
    if (existingReplies.length >= 5) {
      return res.status(400).json({ message: 'You have reached the maximum limit of replies for this comment' });
    }

    // Create the reply
    const createdReply = await client.create({
      _type: 'reply',
      comment: {
        _type: 'reference',
        _ref: commentId,
      },
      name,
      email,
      reply,
    });

    console.log('Reply Submitted');

    return res.status(200).json({ message: 'Reply Submitted', reply: createdReply });
  } catch (err) {
    console.error('Could not submit reply:', err);
    return res.status(500).json({ message: 'Could not submit reply', err });
  }
}
