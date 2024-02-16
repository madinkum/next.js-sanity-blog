import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Comments will not show on the site without approval',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      type: 'string',
    }),
    defineField({
        name: 'post',
        type: 'reference',
        to:{type:'post'}
      }),
  ],
})
