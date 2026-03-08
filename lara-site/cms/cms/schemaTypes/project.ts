import { defineType, defineField } from "sanity"

export const project = defineType({
  name: "project",
  title: "Project",
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
      name: "shortDescription",
      title: "Short Description",
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
      name: "clientType",
      title: "Client Type",
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
      name: "goal",
      title: "Goal",
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
      name: "result",
      title: "Result",
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
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
})

