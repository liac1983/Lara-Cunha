import { defineType, defineField } from "sanity"

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "lessonNumber",
      title: "Lesson Number",
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
      name: "duration",
      title: "Duration",
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
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
    }),

    defineField({
      name: "theory",
      title: "Theory",
      type: "object",
      fields: [
        defineField({
          name: "pt",
          title: "Português",
          type: "array",
          of: [{ type: "block" }],
        }),
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),

    defineField({
      name: "exercises",
      title: "Exercises",
      type: "array",
      of: [
        defineType({
          name: "localizedExercise",
          title: "Localized Exercise",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                defineField({ name: "pt", title: "Português", type: "string" }),
                defineField({ name: "en", title: "English", type: "string" }),
              ],
            }),
            defineField({
              name: "statement",
              title: "Statement",
              type: "object",
              fields: [
                defineField({ name: "pt", title: "Português", type: "text" }),
                defineField({ name: "en", title: "English", type: "text" }),
              ],
            }),
            defineField({
              name: "difficulty",
              title: "Difficulty",
              type: "string",
            }),
            defineField({
              name: "solution",
              title: "Solution",
              type: "object",
              fields: [
                defineField({ name: "pt", title: "Português", type: "text" }),
                defineField({ name: "en", title: "English", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "homework",
      title: "Homework",
      type: "array",
      of: [
        defineType({
          name: "localizedHomework",
          title: "Localized Homework",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                defineField({ name: "pt", title: "Português", type: "string" }),
                defineField({ name: "en", title: "English", type: "string" }),
              ],
            }),
            defineField({
              name: "statement",
              title: "Statement",
              type: "object",
              fields: [
                defineField({ name: "pt", title: "Português", type: "text" }),
                defineField({ name: "en", title: "English", type: "text" }),
              ],
            }),
            defineField({
              name: "difficulty",
              title: "Difficulty",
              type: "string",
            }),
            defineField({
              name: "solution",
              title: "Solution",
              type: "object",
              fields: [
                defineField({ name: "pt", title: "Português", type: "text" }),
                defineField({ name: "en", title: "English", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [
        defineType({
          name: "resourceItem",
          title: "Resource",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "object",
              fields: [
                defineField({ name: "pt", title: "Português", type: "string" }),
                defineField({ name: "en", title: "English", type: "string" }),
              ],
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
})