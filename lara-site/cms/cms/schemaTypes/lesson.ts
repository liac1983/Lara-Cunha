import { defineType, defineField, defineArrayMember } from "sanity"

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "lessonNumber",
      title: "Lesson number",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1),
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'Example: "30 min" or "1h"',
    }),

    defineField({
      name: "theory",
      title: "Theory",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "exercises",
      title: "Exercises",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "exercise",
          title: "Exercise",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "statement",
              title: "Statement",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "difficulty",
              title: "Difficulty",
              type: "string",
              options: {
                list: [
                  { title: "Easy", value: "easy" },
                  { title: "Medium", value: "medium" },
                  { title: "Hard", value: "hard" },
                ],
                layout: "radio",
              },
              initialValue: "easy",
            }),
            defineField({
              name: "solution",
              title: "Solution (optional)",
              type: "text",
              rows: 6,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "difficulty" },
            prepare({ title, subtitle }) {
              return { title, subtitle }
            },
          },
        }),
      ],
    }),

    defineField({
      name: "homework",
      title: "Homework (TPC)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "homeworkItem",
          title: "Homework item",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "statement",
              title: "Statement",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "difficulty",
              title: "Difficulty",
              type: "string",
              options: {
                list: [
                  { title: "Easy", value: "easy" },
                  { title: "Medium", value: "medium" },
                  { title: "Hard", value: "hard" },
                ],
                layout: "radio",
              },
              initialValue: "easy",
            }),
            defineField({
              name: "solution",
              title: "Solution (optional)",
              type: "text",
              rows: 6,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "difficulty" },
            prepare({ title, subtitle }) {
              return { title, subtitle }
            },
          },
        }),
      ],
    }),

    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "resource",
          title: "Resource",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Link", value: "link" },
                  { title: "GitHub", value: "github" },
                  { title: "PDF", value: "pdf" },
                  { title: "Video", value: "video" },
                ],
              },
              initialValue: "link",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "type" },
            prepare({ title, subtitle }) {
              return { title, subtitle }
            },
          },
        }),
      ],
    }),
  ],

  orderings: [
    {
      title: "Lesson number",
      name: "lessonNumberAsc",
      by: [{ field: "lessonNumber", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      lessonNumber: "lessonNumber",
      courseTitle: "course.title",
    },
    prepare({ title, lessonNumber, courseTitle }) {
      const prefix = typeof lessonNumber === "number" ? String(lessonNumber).padStart(2, "0") : "—"
      return {
        title: `${prefix} — ${title}`,
        subtitle: courseTitle ? `Course: ${courseTitle}` : undefined,
      }
    },
  },
})


