import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    isPrimary: z.boolean().default(false),
    priceFrom: z.number().optional(),
    shortDescription: z.string(),
    heroImage: z.string().optional(),
    order: z.number().default(0),
  }),
});

const areas = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/areas' }),
  schema: z.object({
    city: z.string(),
    state: z.string(),
    slug: z.string(),
    county: z.string().optional(),
    blurb: z.string(),
    neighborhoods: z.array(z.string()).optional(),
    // City×service pages for this area can inherit the same photo instead
    // of needing a unique one per combination.
    heroImage: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    bookingUrl: z.string().url().optional(),
    bio: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string(),
    rating: z.number().min(1).max(5),
    quote: z.string(),
    service: z.string().optional(),
    source: z.enum(['google', 'facebook', 'yelp', 'direct']),
    date: z.coerce.date().optional(),
    // Gates AggregateRating schema eligibility — never default this true.
    firstParty: z.boolean(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    page: z.enum(['sitewide', 'service', 'homepage']).default('sitewide'),
    serviceSlug: z.string().optional(),
  }),
});

// Addition beyond the 6 collections named in build-standards: city×service pages
// need real authored local prose per combination (the swap-test in the
// city-pages skill), which a plain data array in site.config.ts can't hold.
const cityServicePages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/city-service-pages' }),
  schema: z.object({
    serviceSlug: z.string(),
    citySlug: z.string(),
    neighborhoods: z.array(z.string()).optional(),
    localAngle: z.string(),
  }),
});

export const collections = { services, areas, blog, team, testimonials, faqs, cityServicePages };
