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

