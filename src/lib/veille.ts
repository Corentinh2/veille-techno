// Référentiel commun : thèmes, niveaux d'importance, calcul des semaines.
// Toute la logique « métier » du site est ici, les pages ne font qu'afficher.

export const CATEGORIES = ['cybersecurite', 'infra-cloud-devops', 'ia', 'reseau-os'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  cybersecurite: 'Cybersécurité',
  'infra-cloud-devops': 'Infra, Cloud & DevOps',
  ia: 'Intelligence artificielle',
  'reseau-os': 'Réseau & OS',
};

export const IMPORTANCES = ['critique', 'eleve', 'moyen', 'info'] as const;
export type Importance = (typeof IMPORTANCES)[number];

export const IMPORTANCE_META: Record<
  Importance,
  { label: string; emoji: string; min: number; max: number; consigne: string }
> = {
  critique: { label: 'Critique', emoji: '🔴', min: 16, max: 20, consigne: 'Action immédiate' },
  eleve: { label: 'Élevé', emoji: '🟠', min: 12, max: 15, consigne: 'À traiter dans la semaine' },
  moyen: { label: 'Moyen', emoji: '🟡', min: 8, max: 11, consigne: 'Nouveauté utile ou tendance à suivre' },
  info: { label: 'Info', emoji: '🔵', min: 0, max: 7, consigne: 'Culture générale' },
};

export const ACTION_TYPES = ['patcher', 'tester', 'surveiller', 'rien'] as const;
export type ActionType = (typeof ACTION_TYPES)[number];

export const ACTION_LABELS: Record<ActionType, string> = {
  patcher: 'Patcher',
  tester: 'Tester',
  surveiller: 'Surveiller',
  rien: 'Rien à faire',
};

export const CRITERIA = [
  { key: 'impact', label: 'Impact' },
  { key: 'urgence', label: 'Urgence' },
  { key: 'perimetre', label: 'Périmètre' },
  { key: 'pertinence', label: 'Pertinence pour moi' },
] as const;

export type Score = { impact: number; urgence: number; perimetre: number; pertinence: number };

export const scoreTotal = (s: Score) => s.impact + s.urgence + s.perimetre + s.pertinence;

export function importanceFromTotal(total: number): Importance {
  if (total >= 16) return 'critique';
  if (total >= 12) return 'eleve';
  if (total >= 8) return 'moyen';
  return 'info';
}

export const importanceRank = (i: Importance) => IMPORTANCES.indexOf(i);

/** Semaine ISO 8601 (lundi = premier jour, semaine 1 = celle du premier jeudi). */
export function isoWeek(date: Date): { year: number; week: number } {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return { year: d.getUTCFullYear(), week };
}

/** Identifiant d'édition, ex. « 2026-s48 ». */
export function editionId(date: Date): string {
  const { year, week } = isoWeek(date);
  return `${year}-s${String(week).padStart(2, '0')}`;
}

/** Titre d'édition, ex. « Veille semaine 48 – 2026 ». */
export function editionTitle(id: string): string {
  const [year, w] = id.split('-s');
  return `Veille semaine ${w} – ${year}`;
}

/** Lundi et dimanche de la semaine ISO d'une édition. */
export function editionRange(id: string): { start: Date; end: Date } {
  const [year, w] = id.split('-s').map(Number);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const start = new Date(jan4);
  start.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() || 7) - 1) + (w - 1) * 7);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  return { start, end };
}

const dateFmt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' });
const shortFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: 'UTC' });
export const formatDate = (d: Date) => dateFmt.format(d);
export const formatShort = (d: Date) => shortFmt.format(d);

/** Préfixe un chemin interne avec la base du site (indispensable sur GitHub Pages). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

/** Tri : date décroissante, puis importance, puis score. */
export function byDateThenImportance<
  T extends { data: { date: Date; importance: Importance; score: Score } },
>(a: T, b: T): number {
  return (
    b.data.date.getTime() - a.data.date.getTime() ||
    importanceRank(a.data.importance) - importanceRank(b.data.importance) ||
    scoreTotal(b.data.score) - scoreTotal(a.data.score)
  );
}
