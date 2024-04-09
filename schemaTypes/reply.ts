export default {
    name: 'reply',
    type: 'document',
    title: 'Reply',
    fields: [
      {
        name: 'name',
        type: 'string',
      },
      // {
      //   name: 'approved',
      //   title: 'Approved',
      //   type: 'boolean',
      //   description: 'Comments will not show on the site without approval',
      // },
      {
        name: 'email',
        type: 'string',
      },
      {
        name: 'reply',
        type: 'string',
      },
      {
          name: 'comment',
          type: 'reference',
          to:{type:'comment'}
        },
    ],
}