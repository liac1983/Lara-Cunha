import { defineType, defineField } from "sanity"

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({
          name: "pt",
          title: "Português",
          type: "string",
        }),
        defineField({
          name: "en",
          title: "English",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.pt",
        maxLength: 96,
      },
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        defineField({
          name: "pt",
          title: "Português",
          type: "text",
        }),
        defineField({
          name: "en",
          title: "English",
          type: "text",
        }),
      ],
    }),

    defineField({
      name: "level",
      title: "Level",
      type: "object",
      fields: [
        defineField({
          name: "pt",
          title: "Português",
          type: "string",
        }),
        defineField({
          name: "en",
          title: "English",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],
})

