// schemas/reply.js

export default {
  name: 'reply',
  title: 'Reply',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'reference',
      to: [{ type: 'comment' }], // Reference to the parent comment
      // validation: Rule => Rule.required(), // Ensure the reply has a parent comment
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'reply',
      title: 'Reply',
      type: 'text',
    },
  ],
};
