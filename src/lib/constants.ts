// Single source of truth for every categorical value used in frontmatter,
// filter pages, and nav. Add new values here — never inline in a component
// or in content.config.ts.

export const STAGES = [
  'general',
  'applying',
  'admission',
  'visa',
  'arrival',
  'studying',
  'working',
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_LABELS: Record<Stage, string> = {
  general: 'General',
  applying: 'Applying',
  admission: 'Admission',
  visa: 'Visa',
  arrival: 'Arrival',
  studying: 'Studying',
  working: 'Working',
};

// Lucide icon names (astro-icon `lucide:` collection) shown next to each
// stage in the nav.
export const STAGE_ICONS: Record<Stage, string> = {
  general: 'lucide:compass',
  applying: 'lucide:file-text',
  admission: 'lucide:graduation-cap',
  visa: 'lucide:stamp',
  arrival: 'lucide:plane-landing',
  studying: 'lucide:book-open',
  working: 'lucide:briefcase',
};

// Starter list — extend as posts reference new universities.
export const UNIVERSITIES = [
  'TU Berlin',
  'TU Munich',
  'RWTH Aachen',
  'University of Stuttgart',
  'TU Dresden',
] as const;

export type University = (typeof UNIVERSITIES)[number];

// Starter list — extend as posts reference new cities.
export const CITIES = [
  'Berlin',
  'Munich',
  'Aachen',
  'Stuttgart',
  'Dresden',
] as const;

export type City = (typeof CITIES)[number];

// Tags allowlist — keep short; a post may use at most 5.
export const TAGS = [
  'vfs',
  'documents',
  'blocked-account',
  'aps',
  'visa',
  'housing',
  'cost-of-living',
  'university',
  'part-time-work',
  'culture',
] as const;

export type Tag = (typeof TAGS)[number];

export const LANGUAGES = ['en', 'de'] as const;

export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
};
