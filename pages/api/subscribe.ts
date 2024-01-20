import axios from 'axios';


export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const listId = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID;

      const response = await axios.post(
        `https://us21.api.mailchimp.com/3.0/lists/${listId}/members`,
        {
          email_address: email,
          status: 'subscribed',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
          },
        }
      );
      
      
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error subscribing to the list:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}