//@ts-ignore
import { definePageType } from '@q42/sanity-plugin-page-tree';
import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { pageTreeConfig } from '@/page-tree-config';

const _homePageType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'the title of the page',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      description: 'In case you want 2 word Title',
      title: 'Sub Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      description: 'This field is the title of your personal website.',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Description',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})

export const home = definePageType(_homePageType, pageTreeConfig, {
  isRoot: true
});

