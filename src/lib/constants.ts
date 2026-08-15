// Single source of truth for every categorical value used in frontmatter,
// filter pages, and nav. Add new values here — never inline in a component
// or in content.config.ts.

// Canonical GitHub URL — update here if the repo ever moves again, instead
// of hunting for hardcoded links across layouts/components.
export const REPO_URL = 'https://github.com/semesterzero/deutsch-path';

export const POST_TYPES = ['experience', 'guide'] as const;

export type PostType = (typeof POST_TYPES)[number];

// Tailwind color class for the type badge — kept next to POST_TYPES so a
// new type can't be added without deciding how it's colored.
export const POST_TYPE_COLOR: Record<PostType, string> = {
  experience: 'text-accent',
  guide: 'text-secondary',
};

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

// Each university's home city — validated against a post's `city` field so
// the two can't silently drift apart (e.g. `university: TU Dresden` paired
// with `city: Berlin`). Keep in sync with UNIVERSITIES/CITIES above.
export const UNIVERSITY_CITY: Record<University, City> = {
  'TU Berlin': 'Berlin',
  'TU Munich': 'Munich',
  'RWTH Aachen': 'Aachen',
  'University of Stuttgart': 'Stuttgart',
  'TU Dresden': 'Dresden',
};

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

// The language a translation group falls back to when picking which
// version to show in a listing (post cards, RSS).
export const DEFAULT_LANGUAGE: Language = 'en';
