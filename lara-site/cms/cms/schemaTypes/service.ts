import { defineType, defineField } from "sanity"

export const service = defineType({
  name: "service",
  title: "Service",
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
      name: "tagline",
      title: "Tagline",
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
      name: "priceFrom",
      title: "Price From",
      type: "string",
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
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineType({
          name: "localizedFeature",
          title: "Localized Feature",
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
      ],
    }),
  ],
})

