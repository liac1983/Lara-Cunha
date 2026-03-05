import { client } from "./client"

export async function getServices() {
  return client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      priceFrom,
      features
    }
  `)
}

export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      slug,
      mainImage,
      shortDescription
    }
  `)
}

export async function getFaqs() {
  return client.fetch(`
    *[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer
    }
  `)
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      heroTitle,
      heroSubtitle,
      heroCtaText
    }
  `)
}

/**
 * COURSES
 */

export async function getCourses() {
  return client.fetch(`
    *[_type == "course" && isPublished == true]
      | order(coalesce(order, 9999) asc, title asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        coverImage,
        level,
        isPublished,
        order
      }
  `)
}


export async function getCourseBySlug(slug: string) {
  if (!slug) return null
  return client.fetch(
    `
      *[_type == "course" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        description,
        coverImage,
        level,
        isPublished,
        order
      }
    `,
    { slug }
  )
}


export async function getLessonsByCourseSlug(courseSlug: string) {
  return client.fetch(
    `
      *[_type == "lesson" && course->slug.current == $courseSlug]
        | order(lessonNumber asc) {
          _id,
          title,
          "slug": slug.current,
          lessonNumber,
          duration,
          "course": {
            "title": course->title,
            "slug": course->slug.current
          }
        }
    `,
    { courseSlug }
  )
}

export async function getLesson(courseSlug: string, lessonSlug: string) {
  return client.fetch(
    `
      *[_type == "lesson" 
        && slug.current == $lessonSlug 
        && course->slug.current == $courseSlug
      ][0]{
        _id,
        title,
        "slug": slug.current,
        lessonNumber,
        duration,
        theory,
        exercises[]{
          title,
          statement,
          difficulty,
          solution
        },
        homework[]{
          title,
          statement,
          difficulty,
          solution
        },
        resources[]{
          label,
          url,
          type
        },

        // ✅ devolve em campos diretos (o frontend já usa isto)
        "courseTitle": course->title,
        "courseSlug": course->slug.current
      }
    `,
    { courseSlug, lessonSlug }
  )
}

