import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CITIES, LANGUAGES, STAGES, TAGS, UNIVERSITIES } from './lib/constants';

const baseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(40).max(160),
  type: z.enum(['experience', 'guide']),
  stage: z.enum(STAGES),
  date: z.coerce.date(),
  lastVerified: z.coerce.date(),
  author: reference('authors'),
  lang: z.enum(LANGUAGES).default('en'),
  university: z.enum(UNIVERSITIES).optional(),
  city: z.enum(CITIES).optional(),
  intake: z
    .string()
    .regex(/^(WS|SS)\d{2}$/, 'intake must look like WS25 or SS26')
    .optional(),
  tags: z.array(z.enum(TAGS)).max(5).default([]),
  draft: z.boolean().default(false),
});

const postSchema = baseSchema.superRefine((data, ctx) => {
  const experienceOnlyFields = ['university', 'city', 'intake'] as const;

  if (data.type === 'experience') {
    for (const field of experienceOnlyFields) {
      if (data[field] === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `type: experience requires "${field}" to be set`,
        });
      }
    }
  }

  if (data.type === 'guide') {
    for (const field of experienceOnlyFields) {
      if (data[field] !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `type: guide must not set "${field}" — that field is experience-only`,
        });
      }
    }
  }
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: postSchema,
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/authors' }),
  schema: z.object({
    displayName: z.string().min(1),
    bio: z.string().optional(),
  }),
});

export const collections = { posts, authors };
